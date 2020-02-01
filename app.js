require('dotenv').config()
var config = require('./config/config');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session)
var passport = require('passport');
var requestlogger = require('./middlewares/generic/logRequest');
var webpush = require('web-push');

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
webpush.setVapidDetails('mailto:bodnar.zsombor@gmail.com', publicVapidKey, privateVapidKey);

// route require
var main = require('./routes/main');
var auth = require('./routes/auth');
var item = require('./routes/item');
var user = require('./routes/user');
var admin = require('./routes/admin')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport
var store = new MongoDBStore(
  {
    uri: config.mongo.path,
    databaseName: 'szertar',
    collection: 'sessions'
  },
  function (error) {
    // Should have gotten an error
  })

store.on('error', function (error) {
  // Also get an error here
})

app.use(session({
  secret: config.sessionSecret,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  resave: true,
  saveUninitialized: true,
  store: store
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
if (config.logrequests) {
  app.use(requestlogger.logrequest());
}

app.use(function (req, res, next) {
  res.tpl = {};
  res.tpl.error = {};
  return next();
});

var sendMail = require('./middlewares/generic/sendMail')
var requireAdmin = require('./middlewares/user/requireAdmin')
app.get('/test', requireAdmin(), function (req, res, next) {
  const payload = JSON.stringify({ title: 'test', body: 'Test message' });
  if (req.user.web_push.length > 0)
    req.user.web_push.forEach(subscription => webpush.sendNotification(subscription, payload).catch(error => {
      console.error(error.stack);
    }))
  next()
}, sendMail('Test message', '<b> Test message </b>', 'Test'), (req, res) => res.end())

// web-push subscribe
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  console.log(subscription);
  if (req.user.web_push.length > 0 && !req.user.web_push.some(i => i.endpoint == subscription.endpoint))
    req.user.web_push.push(subscription)
  else if (!req.user.web_push.length)
    req.user.web_push.push(subscription)
  req.user.save()
  res.status(201).json({});
});

app.post('/unsubscribe', (req, res) => {
  var userModel = objectRepository.userModel
  const subscription = req.body;
  userModel.findByIdAndUpdate(req.user._id, { $pull: { web_push: { endpoint: subscription.endpoint } } }, (err, res) => { })
  res.status(201).json({});
})

var objectRepository = require('./models/objectRepository')
var rentModel = objectRepository.rentModel
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  res.locals.url = req.url
  res.locals.active = req.url.split('/');
  res.locals.newRents = null
  if (req.user) {
    if (req.user.isAdmin && res.locals.active[1] == 'admin') {
      rentModel.find().or([{ state: 1 }, { state: 4 }]).exec((err, rents) => {
        res.locals.newRents = rents.length
        next()
      })
    } else {
      rentModel.findOne({ user: req.user._id, state: 0 }, (err, cart) => {
        req.user.inCart = 0
        if (cart && cart.items.length) {
          cart.items.forEach(item => {
            req.user.inCart += item.amount
          })
        }
        rentModel.find({ user: req.user._id, state: { $gte: 1 } }, (err, rents) => {
          req.user.inRent = 0
          if (rents) req.user.inRent = rents.length
          req.user.save()
          next()
        })
      })
    }
  } else next()
})

// routes
app.use('/', main);
app.use('/auth', auth);
app.use('/item', item);
app.use('/user', user);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
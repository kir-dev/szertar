var config = require('./config/config');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var requestlogger = require('./middlewares/generic/logRequest');
var SSE = require('express-sse')

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
sessionStore = new session.MemoryStore()
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: sessionStore
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

// SSE
var requireAdmin = require('./middlewares/user/requireAdmin');
var requireAuth = require('./middlewares/user/requireAuthentication')
var sendMail = require('./middlewares/generic/sendMail')
adminSSE = new SSE()
userSSE = new SSE()
app.get('/adminSSE', requireAdmin(), adminSSE.init)
app.get('/userSSE', requireAuth, userSSE.init)

app.get('/test', sendMail('Test message', '<b> Test message </b>'), function(req, res){
    adminSSE.send({title: 'Admin', body: 'Body'})
    userSSE.send({title: 'User', body: 'Body'})
    sessionStore.all((err, res) => console.log(res))
    res.end()
})

var objectRepository = require('./models/objectRepository')
var rentModel = objectRepository.rentModel
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  res.locals.active = req.url.split('/');
  if(req.user && req.user.isAdmin && res.locals.active[1] == 'admin') {
    rentModel.find().or([{state: 1}, {state: 3}]).exec((err, rents)=>{
      res.locals.newRents = rents.length
      return next()
    })
  }else return next()
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
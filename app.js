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
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
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

app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  res.locals.active = req.url.split('/');
  return next();
});

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
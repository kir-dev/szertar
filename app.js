var config = require('./config/config');
var http = require('http');
var express = require('express');
var app = express();
var bodyparser = require("body-parser");
var requestlogger = require("./middlewares/generic/logRequest");
var BearerStrategy = require('passport-http-bearer').Strategy;
var session = require('express-session');
var passport = require('passport'),
    OAuth2Strategy = require('passport-oauth2');

var _main = require("./routes/main");
var auth = require("./routes/auth");
var _item = require("./routes/item");

process.on('uncaughtException', function(error) {
    console.log("Uncaught exception in master thread. Terminating in 3 s.");
    console.log(error);
    setTimeout(function () {
        console.log("Exiting master.");
        process.exit(1);
    }, 3000);
});

app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('port', config.port);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
if(config.logrequests) {
    app.use(requestlogger.logrequest());
}
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = {};
    return next();
});

app.use(function(req, res, next){
    res.locals.user = req.user || null;
    return next();
});

app.use('/auth', auth);
app.use('/', _main());
app.use('/item', _item());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

http.createServer(app).listen(app.get('port'), function() {
    console.log("App started on port " + app.get('port'));
});

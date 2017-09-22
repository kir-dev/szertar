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

var _admin = require("./routes/main");
var _login = require("./routes/login");
var _item = require("./routes/item");

process.on('uncaughtException', function(error) {
    console.log("Uncaught exception in master thread. Terminating in 3 s.");
    console.log(error);
    setTimeout(function () {
        console.log("Exiting master.");
        process.exit(1);
    }, 3000);
});

global.config = config;

app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {secure: true}
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new OAuth2Strategy({
        authorizationURL: config.oauth2.authorizationURL,
        tokenURL: config.oauth2.tokenURL,
        clientID: config.oauth2.id,
        clientSecret: config.oauth2.key,
        callbackURL: config.oauth2.callbackURL,
        scope: config.oauth2.scope
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log(accessToken + '\n' + refreshToken + '\n' + JSON.stringify
            (profile));
        var request = require('request');
        request('https://auth.sch.bme.hu/api/profile?access_token=' + accessToken, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return cb(null, JSON.parse(body), null);
            } else {
                return cb(new Error('hello'));
            }
        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

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

app.use('/login', _login());
app.use('/', _admin());
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

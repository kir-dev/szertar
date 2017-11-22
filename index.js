var config = require('./config/config');
var http = require('http');
var express = require('express');
var app = express();
var bodyparser = require("body-parser");
var requestlogger = require("./middlewares/generic/logRequest");
var BearerStrategy = require('passport-http-bearer').Strategy;
var passport = require('passport');
var passportOauth2 = require('passport-oauth2');

var _main = require("./routes/main");
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

passport.use(new BearerStrategy(
    function (token, done) {
        User.findOne({ token: token }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user, { scope: 'read' });
        });
    }
));

app.set('port', config.port);
app.set('view engine', 'ejs');
app.use(express.static('public'));
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
app.use('/', _main());
app.use('/item', _item());

http.createServer(app).listen(app.get('port'), function() {
    console.log("App started on port " + app.get('port'));
});

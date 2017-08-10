var config = require('./config');
var data_access_layer = require('./models/dal/mongodb');
var dal = new data_access_layer(config);
var http = require('http');
var express = require('express');
var app = express();
var bodyparser = require("body-parser");
var requestlogger = require("./middlewares/generic/logRequest");

var _main = require("./routes/main");
var _login = require("./routes/login");

process.on('uncaughtException', function(error) {
    console.log("Uncaught exception in master thread. Terminating in 3 s.");
    console.log(error);
    setTimeout(function () {
        console.log("Exiting master.");
        process.exit(1);
    }, 3000);
});

global.config = config;

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

app.use('/login', _login(dal));
app.use('/', _main(dal));

http.createServer(app).listen(app.get('port'), function() {
    console.log("App started on port " + app.get('port'));
});

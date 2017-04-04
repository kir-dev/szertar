var http = require('http');
var express = require('express');
var app = express();
var bodyparser = require("body-parser");
var requestlogger = require("../middlewares/generic/logRequest");

var _index = require("../../routes/index");
var _login = require("../../routes/login");

exports.createCore = function(dal, config) {
    GLOBAL.dal = dal;
    GLOBAL.config = config;

    app.set('port', config.port);
    //set view engine
    app.set('view engine', 'ejs');
    // serve static
    app.use(express.static('public'));
    // add logger
    if(config.logrequests) {
        app.use(requestlogger.logrequest(config));
    }
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}));
    app.use('/main', _index(dal));
    app.use('/', _login(dal));

    http.createServer(app).listen(app.get('port'), function() {
        console.log("App started on port " + app.get('port'));
    });
};

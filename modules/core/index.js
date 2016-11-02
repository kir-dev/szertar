var http = require('http');
var express = require('express');
var app = express();
var bodyparser = require("body-parser");
var requestlogger = require("../middlewares/requestlogger");

var _index = require("../../routes/index");

exports.createCore = function(dal, config) {
    GLOBAL.dal = dal;
    GLOBAL.config = config;

    app.set('port', config.port);

    if(config.logrequests) {
        app.use(requestlogger.logrequest(config));
    }
    //app.use(bodyparser.json());
    app.set('view engine', 'ejs');
    app.use(bodyparser.urlencoded({extended: true}));
    app.use('/', _index(dal));

    http.createServer(app).listen(app.get('port'), function() {
        console.log("App started on port " + app.get('port'));
    });
};

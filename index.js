var _ = require("lodash");

var config = require('./config');
var data_access_layer = require('./models/dal/mongodb');
var dal = new data_access_layer(config);

process.on('uncaughtException', function(error) {
    console.log("Uncaught exception in master thread. Terminating in 3 s.");
    console.log(error);
    setTimeout(function () {
        console.log("Exiting master.");
        process.exit(1);
    }, 3000);
});

var core = require("./modules/core");
core.createCore(dal, config);

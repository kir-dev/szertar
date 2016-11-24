var express = require('express');
var router = express.Router();


module.exports = function (dal) {

    router.get('/', function (req, res) {
        res.render("pages/index", {testData: "salierri"});
    });

    router.get('/upload', function (req, res) {
        console.log("gotta get got");
    	res.render("pages/upload");
    });

    router.post('/showitem', function (req, res) {
        console.log("upload-name");
        var name = req.itemName;
        console.log(name);
        console.log("upload-count");
        var count = req.count;
        console.log(count);
        console.log("upload-items");
        var items = req.items;
        console.log(items);
        res.render("pages/showitem", {item: name, count: count, items: items});
    });

    return router;
};
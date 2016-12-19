var express = require('express');
var router = express.Router();


module.exports = function (dal) {

    router.get('/', function (req, res) {
        res.render("pages/upload", {items: req.items});
    });

    router.post('/showitem', function (req, res) {
        var name = req.itemName;
        var count = req.count;
        var items = req.items;
        res.render("pages/showitem", {item: name, count: count, items: items});
    });

    return router;
};
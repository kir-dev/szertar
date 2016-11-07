var express = require('express');
var router = express.Router();

module.exports = function (dal) {

    router.get('/', function (req, res) {
        res.render("pages/index", {testData: "salierri"});
    });

    router.get('/upload', function (req, res) {
    	res.render("pages/upload");
    });

    router.post('/upload', function (req, res) {
        var NAME = req.body.item;
        var COUNT = req.body.count;

        var Item = dal.model;
        Item.findOne({name: NAME}, function (err, item) {
            if (err) return console.log(err);
            if (item == null) {
                saveNewItem(NAME, COUNT);
                return;
            }

            item.count += parseInt(COUNT, 10);
            item.save(printError);
        });

    	res.render("pages/showitem", {item: NAME, count: COUNT});
        console.log("end handling post");
    });

    return router;
};

function saveNewItem(NAME, COUNT) {
    var newItem = new dal.model({ name: NAME, count: COUNT});
    newItem.save(printError);
}

function printError(err) {
    if (err) return console.log(err);
}
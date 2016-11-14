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
        var name = req.body.item;
        if (name === "newItem") {
            name = req.body.newItem;
            if (name == null)
                return console.log("No new Item specified.");
        }
        var count = req.body.count;

        var Item = dal.model;
        Item.findOne({name: name}, function (err, item) {
            if (err) return console.log(err);
            if (item == null) {
                saveNewItem(name, count);
            } else {
                item.count += parseInt(count, 10);
                item.save(printError);
            }
            var items = getItems(Item);
            console.log(items);
            console.log("kozepe");
            finish(name, count, items, res);
        });
    });

    return router;
};

function getItems(Item) {
    Item.find({}, function (err, items) {
        if (err) return console.log(err);
        console.log(items);
        console.log("eleje")
        return items;
    });
}

function finish(name, count, items, res) {
    console.log(items);
    console.log("legvege")
    res.render("pages/showitem", {item: name, count: count, items: items});
}

function saveNewItem(NAME, COUNT) {
    var newItem = new dal.model({ name: NAME, count: COUNT});
    newItem.save(printError);
}

function printError(err) {
    if (err) return console.log(err);
}
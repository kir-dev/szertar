var express = require('express');
var router = express.Router();


module.exports = function (dal) {

    router.get('/', listItemsMain);

    router.post('/showitem', addItem);

    return router;
};

function renderMain (req, res) {
    var name = req.itemName;
    var count = req.count;
    var items = req.items;
    res.render("pages/showitem", {item: name, count: count, items: items});
}

function addItem (req, res) {
    var name = req.body.item;
    if (name === "newItem") {
        name = req.body.newItem;
        if (name == null)
            return console.log("No new Item specified.");
    }
    req.itemName = name;
    var count = req.body.count;

    var Item = dal.model;
    Item.findOne({name: name}, function (err, item) {
        if (err) return console.log(err);
        var newItem;
        if (item == null) {
            newItem = new dal.model({ name: NAME, count: COUNT});
        } else {
            item.count += parseInt(count, 10);
            newItem = item;
        }
        newItem.save(function (err) {
            if (err) return console.log(err);
            req.count = count;
            listItems(req, res);
        });
    });
}

function listItems (req, res) {
    var Item = dal.model;
    Item.find({}, function (err, items) {
        if (err) return console.log(err);
        req.items = items;
        renderMain(req, res);
    });
}

function listItemsMain (req, res) {
    var Item = dal.model;
    Item.find({}, function (err, items) {
        if (err) return console.log(err);
        req.items = items;
        renderUpload(req, res);
    });
}

function renderUpload(req, res) {
    res.render("pages/upload", {items: req.items});
}
var express = require('express');
var router = express.Router();


module.exports = function (dal) {

    router.get('/', listItems);

    router.post('/', addItem);

    router.post('/delete', removeItem);

    return router;
};

function addItem(req, res) {
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
        var newItem;
        if (item == null) {
            newItem = new dal.model({ name: name, count: count});
        } else {
            item.count += parseInt(count, 10);
            newItem = item;
        }
        newItem.save(function (err) {
            if (err) return console.log(err);
            req.message = "Sikeres feltöltés: " + count + " " + name + "!";
            listItems(req, res);
        });
    });
}

function removeItem(req, res) {
    var name = req.body.item;
    var count = parseInt(req.body.count, 10);
    var Item = dal.model;
    Item.findOne({name: name}, function (err, item) {
        if (err || item == null) return console.log(err);
        if (count > item.count) {
            req.message = "Nincs ennyi " + name + " a szertárban!";
            return listItems(req, res);
        }
        item.count -= count;
        item.save(function(err) {
           if (err) return console.log(err);
           req.message = "Sikeres törlés: " + count + " " + name + "!";
           listItems(req, res);
        });
    });
}

function listItems(req, res) {
    var Item = dal.model;
    Item.find({}, function (err, items) {
        if (err) return console.log(err);
        req.items = items;
        renderMain(req, res);
    });
}

function renderMain(req, res) {
    res.render("pages/main", {
        message: req.message,
        items: req.items
    });
}
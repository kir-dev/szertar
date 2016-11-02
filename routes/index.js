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

        var newItem = new dal.model({ name: NAME, count: COUNT});
        newItem.save(function (err, newItem) {
            if (err) return console.error(err);
        });

    	res.render("pages/showitem", {item: NAME, count: COUNT});
        console.log("end handling post");
    }); 

    return router;
}
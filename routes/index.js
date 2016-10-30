var express = require('express');
var router = express.Router();
var qs = require('querystring');

module.exports = function (dal) {

    router.get('/', function (req, res) {
        res.render("pages/index", {testData: "salierri"});
    });

    router.get('/upload', function (req, res) {
    	res.render("pages/upload");
    });

    router.post('/upload', function (req, res) {
    	console.log(req.body.item);
    	console.log(req.body.count);
    	res.render("pages/showitem", {item: req.body.item, count: req.body.count})
        console.log("end handling post");
    }); 

    return router;
}
var express = require('express');
var router = express.Router();

var objectRepository = require('../models/objectRepository');
var getAllItems = require('../middlewares/item/getAllItems');
var getItem = require('../middlewares/item/getItem');
var newItem = require('../middlewares/item/newItem');
var updateItem = require('../middlewares/item/updateItem');
var deleteItem = require('../middlewares/item/deleteItem');

router.get('/', getAllItems(), function (req, res) {
    res.render('pages/items');
});

router.get('/:id', getItem(), function (req, res) {
    res.render('pages/item');
});

router.post('/create', newItem(), function (req, res) {
    res.redirect('/');
});

router.post('/edit', getItem(), updateItem(), function(req, res){
    res.redirect('/');
});



router.delete('/:id', deleteItem(),
    function (req, res) {
        res.redirect('/');
    }
);

module.exports = router;
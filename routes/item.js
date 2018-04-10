var express = require('express');
var router = express.Router();

var getItem = require('../middlewares/item/getItem');
var newItem = require('../middlewares/item/newItem');
var editItem = require('../middlewares/item/editItem');
var deleteItem = require('../middlewares/item/deleteItem');
var requireAdmin = require('../middlewares/user/requireAdmin');

router.post('/create', requireAdmin(), newItem(), function (req, res) {
    res.redirect('/admin');
});

router.post('/edit', requireAdmin(), getItem(), editItem(), function (req, res) {
    res.redirect('/admin');
});

router.delete('/:id', requireAdmin(), deleteItem(), function (req, res) {
    res.status(200).end();
});

module.exports = router;
var express = require('express');
var router = express.Router();
var renderMainMW = require('../middlewares/generic/renderMain');
var getAllItems = require('../middlewares/item/getAllItems');

router.get('/',
    getAllItems(),
    renderMainMW()
);

router.get('/admin',
    getAllItems(),
    function (req, res) {
        res.render('pages/admin', {
            items: req.items
        });
    });

module.exports = router;
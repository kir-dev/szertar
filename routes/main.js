var express = require('express');
var router = express.Router();
var renderMainMW = require('../middlewares/generic/renderMain');
var getAllItems = require('../middlewares/item/getAllItems');
var requireAdmin = require('../middlewares/user/requireAdmin');

router.get('/',
    getAllItems(),
    renderMainMW()
);

router.get('/admin',
    requireAdmin(),
    getAllItems(),
    function (req, res) {
        res.render('pages/admin', {
            items: req.items
        });
    });

router.get('/about',
    (req, res) => {
        res.render('pages/about');
    }
);

module.exports = router;
var express = require('express');
var router = express.Router();
var getAllItems = require('../middlewares/item/getAllItems');
var renderMain = require('../middlewares/generic/renderMain');
var requireAdmin = require('../middlewares/user/requireAdmin');

/* GET home page. */
router.get('/',
    getAllItems(),
    renderMain()
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
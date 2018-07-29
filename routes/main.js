var express = require('express');
var router = express.Router();
var getAllItems = require('../middlewares/item/getAllItems');
var getAllRents = require('../middlewares/item/getAllRents')
var getAllUsers = require('../middlewares/user/getAllUsers')
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
    getAllRents(),
    getAllUsers(),
    function (req, res) {
        res.render('pages/admin', {
            items: req.items,
            rents: req.rents,
            users: req.users
        });
    });

router.get('/about',
    (req, res) => {
        res.render('pages/about');
    }
);

module.exports = router;
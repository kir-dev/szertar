var express = require('express');
var router = express.Router();
var getAllItems = require('../middlewares/item/getAllItems');
var getAllRents = require('../middlewares/item/getAllRents')
var getAllUsers = require('../middlewares/user/getAllUsers')
var renderMain = require('../middlewares/generic/renderMain');
var requireAdmin = require('../middlewares/user/requireAdmin');
var getWeekRents = require('../middlewares/item/getWeekRents')
var moment = require('moment')

/* GET home page. */
router.get('/',
    getAllItems(),
    renderMain()
);

router.get('/admin',
    requireAdmin(),
    getAllItems(),
    getAllUsers(),
    getWeekRents(),
    function (req, res) {
        res.render('pages/admin', {
            items: req.items,
            rents: req.rents,
            users: req.users,
            weekRents: req.weekRents,
            moment: moment
        });
    });

router.get('/about',
    (req, res) => {
        res.render('pages/about');
    }
);

module.exports = router;
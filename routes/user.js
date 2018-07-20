var express = require('express');
var router = express.Router();
var getAllRents = require('../middlewares/item/getAllRents')
var getAllItems = require('../middlewares/item/getAllItems')
var requireAuth = require('../middlewares/user/requireAuthentication')

router.get('/rents', requireAuth,
    (req, res) => {
        res.render('pages/rents');
    }
);

router.get('/cart', requireAuth, getAllItems(), getAllRents(),
    (req, res) => {
        res.render('pages/cart', {
            rents: req.rents,
            items: req.items
        });
    }
);

module.exports = router;
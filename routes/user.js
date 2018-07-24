var express = require('express');
var router = express.Router();
var getAllRents = require('../middlewares/item/getAllRents')
var getAllItems = require('../middlewares/item/getAllItems')
var requireAuth = require('../middlewares/user/requireAuthentication')
var confirmCart = require('../middlewares/user/confirmCart')

router.get('/rents', requireAuth, getAllItems(), getAllRents(),
    (req, res) => {
        res.render('pages/rents', {
            rents: req.rents,
            items: req.items
        });
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

router.post('/cart/confirm', requireAuth, confirmCart(), (req, res) => {
    res.redirect('/user/rents')
})

module.exports = router;
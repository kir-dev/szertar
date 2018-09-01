var express = require('express');
var router = express.Router();
var getCart = require('../middlewares/item/getCart')
var getAllRents = require('../middlewares/item/getAllRents')
var getAllItems = require('../middlewares/item/getAllItems')
var requireAuth = require('../middlewares/user/requireAuthentication')
var confirmCart = require('../middlewares/user/confirmCart')
var returnRent = require('../middlewares/user/returnRent')
var sendMail = require('../middlewares/generic/sendMail')
var deleteCartItem = require('../middlewares/item/deleteCartItem')

router.get('/rents', requireAuth, getAllItems(), getAllRents(),
    (req, res) => {
        res.render('pages/rents', {
            rents: req.rents,
            items: req.items
        });
    }
);

router.post('/rents/:id', requireAuth, returnRent(), (req, res) => {
    res.status(200).end()
    sendMail(req.user.name+' leadna!', req.user.name+' leadna!', 'Új leadás')()
})

router.get('/cart', requireAuth, getAllItems(), getCart(),
    (req, res) => {
        res.render('pages/cart', {
            cart: req.cart,
            items: req.items
        });
    }
);

router.post('/cart/confirm', requireAuth, confirmCart(), (req, res, next) => {
    res.redirect('/user/rents')
    sendMail(req.user.name+' kölcsönözne!', req.user.name+' kölcsönözne!', 'Új kölcsönzés')()
})

router.delete('/cart/item/:id', requireAuth, deleteCartItem(), (req, res)=>{
    res.status(200).end()
})

module.exports = router;
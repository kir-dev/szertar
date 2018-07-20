var express = require('express');
var router = express.Router();
var requireAdmin = require('../middlewares/user/requireAdmin');
var getAllItems = require('../middlewares/item/getAllItems');
var getAllUsers = require('../middlewares/user/getAllUsers')
var getAllRents = require('../middlewares/item/getAllRents')
var deleteRent = require('../middlewares/item/deleteRent')

router.get('/items', requireAdmin(), getAllItems(), function(req, res){
    res.render('pages/admin/items', {
        items: req.items
    })
})
router.get('/rents', requireAdmin(), getAllItems(), getAllUsers(), getAllRents(), function(req, res){
    res.render('pages/admin/rents', {
        items: req.items,
        users: req.users,
        rents: req.rents
    })
})
router.get('/users', requireAdmin(), getAllUsers(), function(req, res){
    res.render('pages/admin/users', {
        users: req.users
    })
})

router.delete('/rents/:id', requireAdmin(), deleteRent(), function(req, res){
    res.status(200).end()
})

module.exports = router;
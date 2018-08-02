var express = require('express');
var router = express.Router();
var requireAdmin = require('../middlewares/user/requireAdmin');
var getAllItems = require('../middlewares/item/getAllItems');
var getAllUsers = require('../middlewares/user/getAllUsers')
var getAllRents = require('../middlewares/item/getAllRents')
var deleteRent = require('../middlewares/item/deleteRent')
var approveRent = require('../middlewares/item/approveRent')
var deleteUser = require('../middlewares/user/deleteUser')
var sendMail = require('../middlewares/generic/sendMail')
var changeAdmin = require('../middlewares/user/changeAdmin')

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

router.delete('/users/:id', requireAdmin(), deleteUser(), function(req, res){
    res.status(200).end()
})

router.post('/users/:id', requireAdmin(), changeAdmin(), function(req, res){
    res.status(200).end()
})

router.post('/rents/:id', requireAdmin(), approveRent(), function(req, res){
    res.status(200).end()
}, sendMail('Test message', '<b> Test message </b>'))

module.exports = router;
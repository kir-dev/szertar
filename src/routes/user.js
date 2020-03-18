const express = require('express')
const router = express.Router()
const getCart = require('../middlewares/item/getCart')
const getAllRents = require('../middlewares/item/getAllRents')
const getAllItems = require('../middlewares/item/getAllItems')
const requireAuth = require('../middlewares/user/requireAuthentication')
const confirmCart = require('../middlewares/user/confirmCart')
const returnRent = require('../middlewares/user/returnRent')
const sendMail = require('../middlewares/generic/sendMail')
const deleteCartItem = require('../middlewares/item/deleteCartItem')

router.get('/rents', requireAuth, getAllItems(), getAllRents(), (req, res) => {
  res.render('pages/rents', {
    rents: req.rents,
    items: req.items
  })
})

router.post('/rents/:id', requireAuth, returnRent(), (req, res) => {
  res.status(200).end()
  sendMail(
    req.user.name + ' leadna!',
    req.user.name + ' leadna!',
    'Új leadás'
  )()
})

router.get('/cart', requireAuth, getAllItems(), getCart(), (req, res) => {
  res.render('pages/cart', {
    cart: req.cart,
    items: req.items
  })
})

router.post('/cart/confirm', requireAuth, confirmCart(), (req, res) => {
  res.redirect('/user/rents')
  sendMail(
    req.user.name + ' kölcsönözne!',
    req.user.name + ' kölcsönözne!',
    'Új kölcsönzés'
  )()
})

router.delete('/cart/item/:id', requireAuth, deleteCartItem(), (req, res) => {
  res.status(200).end()
})

module.exports = router

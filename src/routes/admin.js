const express = require('express')
const router = express.Router()
const requireAdmin = require('../middlewares/user/requireAdmin')
const getAllItems = require('../middlewares/item/getAllItems')
const getAllUsers = require('../middlewares/user/getAllUsers')
const getAllRents = require('../middlewares/item/getAllRents')
const deleteRent = require('../middlewares/item/deleteRent')
const approveRent = require('../middlewares/item/approveRent')
const deleteUser = require('../middlewares/user/deleteUser')
const sendMail = require('../middlewares/generic/sendMail')
const changeAdmin = require('../middlewares/user/changeAdmin')

router.get('/items', requireAdmin(), getAllItems(), (req, res) => {
  res.render('pages/admin/items', {
    items: req.items
  })
})

router.get(
  '/rents',
  requireAdmin(),
  getAllItems(),
  getAllUsers(),
  getAllRents(),
  (req, res) => {
    res.render('pages/admin/rents', {
      items: req.items,
      users: req.users,
      rents: req.rents
    })
  }
)

router.get('/users', requireAdmin(), getAllUsers(), (req, res) => {
  res.render('pages/admin/users', {
    users: req.users
  })
})

router.delete('/rents/:id', requireAdmin(), deleteRent(), (req, res) => {
  res.status(200).end()
})

router.delete('/users/:id', requireAdmin(), deleteUser(), (req, res) => {
  res.status(200).end()
})

router.post('/users/:id', requireAdmin(), changeAdmin(), (req, res) => {
  res.status(200).end()
})

router.post(
  '/rents/:id',
  requireAdmin(),
  approveRent(),
  (req, res) => {
    res.status(200).end()
  },
  sendMail('Test message', '<b> Test message </b>')
)

module.exports = router

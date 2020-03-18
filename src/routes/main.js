const express = require('express')
const router = express.Router()
const getAllItems = require('../middlewares/item/getAllItems')
const getAllUsers = require('../middlewares/user/getAllUsers')
const renderMain = require('../middlewares/generic/renderMain')
const requireAdmin = require('../middlewares/user/requireAdmin')
const getWeekRents = require('../middlewares/item/getWeekRents')
const moment = require('moment')

/* GET home page. */
router.get('/', getAllItems(), renderMain())

router.get(
  '/admin/chart/:week',
  requireAdmin(),
  getAllItems(),
  getAllUsers(),
  getWeekRents(),
  (req, res) => {
    res.render('pages/admin', {
      items: req.items,
      rents: req.rents,
      users: req.users,
      weekRents: req.weekRents,
      moment: moment
    })
  }
)

router.get(
  '/admin',
  requireAdmin(),
  getAllItems(),
  getAllUsers(),
  getWeekRents(),
  (req, res) => {
    res.render('pages/admin', {
      items: req.items,
      rents: req.rents,
      users: req.users,
      weekRents: req.weekRents,
      moment: moment
    })
  }
)

router.get('/about', (req, res) => {
  res.render('pages/about')
})

module.exports = router

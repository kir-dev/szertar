const express = require('express')
const router = express.Router()
const passport = require('passport')

require('../config/passport')()

router.post(
  '/login',
  (req, res, next) => {
    res.cookie('ref', req.body.referer, { maxAge: 1 * 60 * 1000 })
    next()
  },
  passport.authenticate('oauth2')
)

router.get(
  '/authsch/callback',
  passport.authenticate('oauth2', {
    failureRedirect: '/auth/login'
  }),
  (req, res) => {
    res.clearCookie('ref')
    res.redirect(req.cookies.ref || '/')
  }
)
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router

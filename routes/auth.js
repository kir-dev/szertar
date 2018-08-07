var express = require('express');
var router = express.Router();
var passport = require('passport');

require('../config/passport')();

router.post('/login', (req, res, next) => {
    res.cookie("ref", req.body.referer, {maxAge: 1 * 60 * 1000})
    next()
}, passport.authenticate('oauth2'))

router.get('/authsch/callback', passport.authenticate('oauth2', {
        failureRedirect: '/auth/login'
    }), (req, res) => {
        res.clearCookie("ref")
        res.redirect(req.cookies.ref || '/')
    }
)
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
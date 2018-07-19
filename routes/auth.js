var express = require('express');
var router = express.Router();
var passport = require('passport');

require('../config/passport')();

router.get('/login',
    passport.authenticate('oauth2')
);

router.get('/authsch/callback',
    passport.authenticate('oauth2', {
        successRedirect: '/',
        failureRedirect: '/auth/login'
    }))

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
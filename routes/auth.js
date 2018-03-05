var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login',
    passport.authenticate('oauth2')
);

router.get('/authsch/callback',
    passport.authenticate('oauth2', {
        failureRedirect: '/auth/login' 
    }),
    function (req, res) {
        res.redirect('/');
    });

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

require('../utilities/passportInit')();
module.exports = router;
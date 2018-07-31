var express = require('express');
var router = express.Router();
var passport = require('passport');

require('../config/passport')();

router.post('/login', (req, res, next) => {
    return next()
},
    passport.authenticate('oauth2')
);

router.get('/authsch/callback', passport.authenticate('oauth2', {
        failureRedirect: '/auth/login'
    }), (req, res) => {
        res.redirect(req.headers.referer)
    }
)
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
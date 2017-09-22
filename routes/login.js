var express = require('express');
var router = express.Router();
var passport = require('passport');

module.exports = function () {

	router.get('/',
		function (req, res, next) {
            res.render("pages/login");
        });

    router.use('/login',
        passport.authenticate('oauth2'));

    router.use('/logout',
    function (req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
};

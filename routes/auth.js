var express = require('express');
var router = express.Router();
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2');
var request = require('request');
var User = require('../models/user');
var config = require('../config/config');

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

passport.use(new OAuth2Strategy({
        authorizationURL: config.oauth2.authorizationURL,
        tokenURL: config.oauth2.tokenURL,
        clientID: config.oauth2.id,
        clientSecret: config.oauth2.key,
        callbackURL: config.oauth2.callbackURL,
        scope: config.oauth2.scope
    },
    function (accessToken, refreshToken, profile, done) {
        request(config.oauth2.userURL + accessToken,
            function (error, response, body) {
                var authSchUser = JSON.parse(body);

                User.findOne({
                    authSchId: authSchUser.internal_id
                }, (err, user) => {
                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();

                        newUser.name = authSchUser.displayName;
                        newUser.authSchId = authSchUser.internal_id;
                        newUser.email = authSchUser.mail;
                        newUser.save((err) => {
                            if (err) throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
    }));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (userId, done) {
    User.findOne({
        _id: userId
    }, (err, user) => {
        done(err, user);
    });
});

module.exports = router;
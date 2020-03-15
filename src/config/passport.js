var passport = require('passport')
var OAuth2Strategy = require('passport-oauth2')
var request = require('request')

var User = require('../models/user')
var config = require('../config/config')

module.exports = function() {
  passport.use(
    new OAuth2Strategy(
      {
        authorizationURL: config.oauth2.authorizationURL,
        tokenURL: config.oauth2.tokenURL,
        clientID: config.oauth2.id,
        clientSecret: config.oauth2.key,
        callbackURL: config.oauth2.callbackURL,
        scope: config.oauth2.scope
      },
      (accessToken, refreshToken, profile, done) => {
        request(
          config.oauth2.userURL + accessToken,
          (error, response, body) => {
            var authSchUser = JSON.parse(body)
            console.log(authSchUser)
            User.findByAuthSchOrCreate(authSchUser, done)
          }
        )
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((userId, done) => {
    User.findOne(
      {
        _id: userId
      },
      (err, user) => {
        done(err, user)
      }
    )
  })
}

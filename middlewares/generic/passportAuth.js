module.exports = function () {
    return passport.authenticate('oauth2', {failureRedirect: '/login'});
};
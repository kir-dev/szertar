var db = require('../config/db');

var User = db.model('User', {
    token: String,
    dateOfRegistration: Date,
    isAdmin: Boolean
});

module.exports = User;
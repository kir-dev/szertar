var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Item = db.model('Item', {
    name: {
        type: String
    },
    count: {
        type: Number
    }
});

module.exports = Item;
var mongoose = require('mongoose');
var db = require('../config/db');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserScema =  new Schema({
    _id: {
        type: ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    authSchId: String,
    name: String,
    email: String,
}, {
    timestamps: true
});

User = mongoose.model('User', UserScema);

module.exports = User;
var mongoose = require('mongoose');
var db = require('../config/db');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var RentSchema = new Schema({
    _id: {
        type: ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    isRented: Boolean,
    isReturned: Boolean,
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

var Rent = db.model('Rent', RentSchema);

module.exports = Rent;
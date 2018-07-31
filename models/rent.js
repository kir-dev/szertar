var mongoose = require('mongoose');
var db = require('../config/db');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var RentSchema = new Schema({
    _id: {
        type: ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    state: {type: Number, min: 0},
    isRented: Boolean,
    isReturned: Boolean,
    items: [{
        id: {type: Schema.Types.ObjectId, ref: 'Item'},
        amount: {type: Number, min: 0}
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

var Rent = db.model('Rent', RentSchema);

module.exports = Rent;
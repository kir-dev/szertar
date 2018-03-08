var mongoose = require('mongoose');
var db = require('../config/db');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CartSchema = new Schema({
    _id: {
        type: ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

var Cart = db.model('Cart', CartSchema);

module.exports = Cart;
var mongoose = require('mongoose');
var db = require('../config/db');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ItemSchema = new Schema({
    _id: {
        type: ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    name: String,
    count: Number,
    stock: Number,
    imgPath: String
});

var Item = db.model('Item', ItemSchema);

module.exports = Item;
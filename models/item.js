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

ItemSchema.statics.findByAuthSchOrCreate = function (newItem, callback) {
    this.findOne({
        _id: newItem._id
    }, (err, item) => {
        if (err){
            return callback(err);
        }

        if (item) {
            return callback(null, item);
        } else {
            this.create(newItem, function (err, item) {
                if (err){
                    throw err;
                } 
                return callback(null, item);
            });
        }
    });
};

var Item = db.model('Item', ItemSchema);

module.exports = Item;
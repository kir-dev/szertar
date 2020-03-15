var mongoose = require('mongoose')
var db = require('../config/db')

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

var ItemSchema = new Schema({
  _id: {
    type: ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  name: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    min: 0,
    required: true
  },
  stock: {
    type: Number,
    min: 0,
    required: true
  },
  imgPath: String
})

var Item = db.model('Item', ItemSchema)

module.exports = Item
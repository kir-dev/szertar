const mongoose = require('mongoose')
const db = require('../config/db')

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

const ItemSchema = new Schema({
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

const Item = db.model('Item', ItemSchema)

module.exports = Item

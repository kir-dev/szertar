const mongoose = require('mongoose')
const db = require('../config/db')

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

const CartSchema = new Schema({
  _id: {
    type: ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Cart = db.model('Cart', CartSchema)

module.exports = Cart

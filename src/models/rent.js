const mongoose = require('mongoose')
const db = require('../config/db')

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

const RentSchema = new Schema(
  {
    _id: {
      type: ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    state: { type: Number, min: 0 },
    isRented: Boolean,
    isReturned: Boolean,
    items: [
      {
        id: { type: Schema.Types.ObjectId, ref: 'Item' },
        amount: { type: Number, min: 0, required: true }
      }
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Rent = db.model('Rent', RentSchema)

module.exports = Rent

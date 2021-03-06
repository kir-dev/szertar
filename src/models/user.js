// TODO
/* eslint-disable no-undef */
const mongoose = require('mongoose')

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

const UserScema = new Schema(
  {
    _id: {
      type: ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    authSchId: String,
    web_push: [],
    name: String,
    email: String,
    phone: String,
    isAdmin: Boolean,
    inCart: { type: Number, min: 0 },
    inRent: { type: Number, min: 0 }
  },
  {
    timestamps: true
  }
)

UserScema.statics.findByAuthSchOrCreate = function(authSchUser, callback) {
  this.findOne(
    {
      authSchId: authSchUser.internal_id
    },
    (err, user) => {
      if (err) return callback(err)
      const isAdmin = authSchUser.eduPersonEntitlement.some(obj => {
        //106-Kir-Dev, 164-DSK
        return (obj.id === 106 || obj.id === 164) && obj.status.length > 0
      })
      if (user) {
        if (!user.isAdmin && isAdmin) {
          user.isAdmin = true
          user.save()
        }
        return callback(null, user)
      } else {
        const newUser = new User()
        newUser.name = authSchUser.displayName
        newUser.authSchId = authSchUser.internal_id
        newUser.email = authSchUser.mail
        newUser.isAdmin = isAdmin
        newUser.phone = authSchUser.mobile
        newUser.inCart = 0
        newUser.inRent = 0
        newUser.save(err => {
          if (err) throw err
          return callback(null, newUser)
        })
      }
    }
  )
}

User = mongoose.model('User', UserScema)

module.exports = User

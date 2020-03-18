const objectRepository = require('../../models/objectRepository')
const rentModel = objectRepository.rentModel

module.exports = function() {
  return function(req, res, next) {
    rentModel.findOne({ user: req.user._id, state: 0 }, (err, cart) => {
      if (err) return next(err)
      req.cart = cart
      return next()
    })
  }
}

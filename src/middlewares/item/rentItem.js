var objectRepository = require('../../models/objectRepository')
var rentModel = objectRepository.rentModel
var itemModel = objectRepository.itemModel

module.exports = function() {
  return function(req, res, next) {
    itemModel.findById(req.body.itemId, (err, item) => {
      if (
        parseInt(req.body.amount) <= 0 ||
        parseInt(req.body.amount) > item.stock
      )
        return next()
      rentModel.findOne({ user: req.user._id, state: 0 }).exec((err, res) => {
        if (res) {
          var item = res.items.find(
            item => item._id === parseInt(req.body.itemId)
          )
          if (item) item.amount += parseInt(req.body.amount)
          else res.items.push({ _id: req.body.itemId, amount: req.body.amount })
          res.save(err => {
            if (err) return next(err)
          })
          return next()
        } else {
          rentModel.create(
            new rentModel({
              state: 0,
              isRented: false,
              isReturned: false,
              items: [{ _id: req.body.itemId, amount: req.body.amount }],
              user: req.user._id
            }),
            err => {
              if (err) return next(err)
              return next()
            }
          )
        }
      })
    })
  }
}

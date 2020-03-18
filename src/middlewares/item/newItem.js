const objectRepository = require('../../models/objectRepository')
const itemModel = objectRepository.itemModel

const newItem = function() {
  return function(req, res, next) {
    itemModel.create(
      new itemModel({
        name: req.body.item,
        count: req.body.count,
        stock: req.body.count,
        imgPath: req.file ? '/img/' + req.file.filename + '.png' : ''
      }),
      err => {
        if (err) next(err)
        return next()
      }
    )
  }
}

module.exports = newItem

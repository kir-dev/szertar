const objectRepository = require('../../models/objectRepository')
const userModel = objectRepository.userModel

module.exports = function() {
  return function(req, res, next) {
    userModel.findByIdAndRemove(req.params.id, err => {
      if (err) return next(err)
      return next()
    })
  }
}

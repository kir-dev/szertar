const objectRepository = require('../../models/objectRepository')
const userModel = objectRepository.userModel

module.exports = function() {
  return function(req, res, next) {
    userModel.findById(req.params.id, (err, res) => {
      res.isAdmin = !res.isAdmin
      res.save()
      return next()
    })
  }
}

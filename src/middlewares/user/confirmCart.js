var objectRepository = require('../../models/objectRepository')
var rentModel = objectRepository.rentModel
var userModel = objectRepository.userModel
var webpush = require('web-push')

module.exports = function() {
  return function(req, res, next) {
    rentModel
      .findOne({ _id: req.body.id, state: 0, user: req.user._id })
      .populate({ path: 'items._id', model: 'Item' })
      .exec((err, rent) => {
        if (err) return next(err)
        var error = false
        rent.items.some(item => {
          var tmp = parseInt(req.body[item._id._id])
          if (tmp > item._id.stock) {
            error = true
            return true
          } else {
            item.amount = tmp
            return false
          }
        })
        if (error) return next()
        rent.state = 1
        rent.save()

        const payload = JSON.stringify({
          title: 'Új kölcsönzés',
          body: req.user.name + ' kölcsönözne',
          link: '/admin/rents'
        })
        userModel.find({ isAdmin: true }, (err, res) => {
          res.forEach(admin => {
            if (admin.web_push.length > 0)
              admin.web_push.forEach(subscription => {
                if (subscription.endpoint)
                  webpush
                    .sendNotification(subscription, payload)
                    .catch(error => {
                      console.error(error.stack)
                    })
              })
          })
        })
        return next()
      })
  }
}

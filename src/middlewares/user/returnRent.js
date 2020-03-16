var objectRepository = require('../../models/objectRepository')
var rentModel = objectRepository.rentModel
var userModel = objectRepository.userModel
var webpush = require('web-push')

module.exports = function() {
  return function(req, res, next) {
    rentModel.findOneAndUpdate(
      { _id: req.params.id, state: 3 },
      { state: 4 },
      (err, res) => {
        if (err || !res) return next(err)
        const payload = JSON.stringify({
          title: 'Eszköz leadás',
          body: req.user.name + ' eszközt adna le',
          link: '/admin/rents'
        })
        userModel.find({ isAdmin: true }, (err, res) => {
          res.forEach(admin => {
            console.log('web-push ', admin.web_push.length)
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
      }
    )
  }
}

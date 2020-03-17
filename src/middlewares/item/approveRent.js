const objectRepository = require('../../models/objectRepository')
const rentModel = objectRepository.rentModel
const itemModel = objectRepository.itemModel
const userModel = objectRepository.userModel
const webpush = require('web-push')

module.exports = function() {
  return function(req, res, next) {
    rentModel
      .findByIdAndUpdate(req.params.id, { isRented: true, $inc: { state: 1 } })
      .populate({ path: 'items._id', model: 'Item' })
      .exec((err, res) => {
        if (res.state === 2 || res.state === 5)
          res.items.forEach(item => {
            const query = {
              stock: res.state === 2 ? -item.amount : item.amount
            }
            itemModel.findByIdAndUpdate(item._id._id, { $inc: query }).exec()
          })
        if (res.state === 1 || res.state === 4) {
          const payload = JSON.stringify({
            title: 'Kölcsönzésed módosult',
            body: 'Kölcsönzésed módosult',
            link: '/user/rents'
          })
          userModel.findById(res.user, (err, user) => {
            if (user.web_push.length > 0)
              user.web_push.forEach(subscription => {
                if (subscription.endpoint)
                  webpush
                    .sendNotification(subscription, payload)
                    .catch(error => console.error(error.stack))
              })
          })
        }
        return next()
      })
  }
}

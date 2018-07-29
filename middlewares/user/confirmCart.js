var objectRepository = require('../../models/objectRepository')
var rentModel = objectRepository.rentModel
var userModel = objectRepository.userModel

module.exports = function () {
    return function (req, res, next) {
        rentModel.findOneAndUpdate({_id: req.body.id, state: 0}, {state: 1}, function (err, rent){
            if (err) return next(err)
            rent.items.forEach(item => {
                item.amount = req.body[item._id]
            })
            rent.save()
            req.user.inRent++
            req.user.inCart = 0
            req.user.save()
            var text = {title: 'Új kölcsönzés', body: req.user.name+' kölcsönözne'}
            adminSSE.send(text)
        })
        return next()
    }
}
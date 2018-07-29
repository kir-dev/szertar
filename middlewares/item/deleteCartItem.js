var objectRepository = require('../../models/objectRepository')
var rentModel = objectRepository.rentModel

module.exports = function () {
    return function (req, res, next) {
        rentModel.findOne({user: req.user._id, state: 0}, (err, res)=>{
            req.user.inCart -= (res.items.find(item => item._id == req.params.id)).amount
            req.user.save()
        })
        rentModel.findOneAndUpdate({user: req.user._id, state: 0}, {$pull: {items: {_id: req.params.id}}}, (err, res) => {})
        return next()
    }
}
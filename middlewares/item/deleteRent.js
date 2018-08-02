var objectRepository = require('../../models/objectRepository');
var rentModel = objectRepository.rentModel;
var userModel = objectRepository.userModel

module.exports = function () {
    return function (req, res, next) {
        rentModel.findById(req.params.id).populate({path: 'items._id', model: 'Item'}).populate({path: 'user', model: 'User'}).exec((err, res) => {
            res.items.forEach(item => {
                item._id.stock += item.amount
                item._id.save()
            })
            res.save()
            rentModel.findByIdAndRemove(
                req.params.id
             , function (err) {
                 if (err) return next(err);           
                 return next();
             })
        })
    };
};
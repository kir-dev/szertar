var objectRepository = require('../../models/objectRepository');
var rentModel = objectRepository.rentModel;
var itemModel = objectRepository.itemModel

module.exports = function () {
    return function (req, res, next) {
        rentModel.findByIdAndUpdate(req.params.id, {isRented: true, $inc: {state: 1}}, function (err){
            if (err) return next(err);
        })
        rentModel.findById(req.params.id).populate({path: 'items._id', model: 'Item'}).exec((err, res) => {
            res.items.forEach(item => {
                if(item._id.stock -= item.amount >= 0) itemModel.findByIdAndUpdate(item._id._id, {$inc: {stock: -item.amount}}).exec()
            });
        })
        return next()
    };
};
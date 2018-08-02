var objectRepository = require('../../models/objectRepository');
var rentModel = objectRepository.rentModel;
var itemModel = objectRepository.itemModel

module.exports = function () {
    return function (req, res, next) {
        rentModel.findByIdAndUpdate(req.params.id, {isRented: true, $inc: {state: 1}}).populate({path: 'items._id', model: 'Item'}).exec((err, res) => {
            if(res.state == 2 || res.state == 5)
            res.items.forEach(item => {
                var query = {stock: (res.state == 2 ) ? -item.amount : item.amount}
                itemModel.findByIdAndUpdate(item._id._id, {$inc: query}).exec()
            })
            return next()
        })
    }
}
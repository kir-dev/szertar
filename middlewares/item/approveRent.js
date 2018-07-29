var objectRepository = require('../../models/objectRepository');
var rentModel = objectRepository.rentModel;

module.exports = function () {
    return function (req, res, next) {
        rentModel.findByIdAndUpdate(req.params.id, {isRented: true, $inc: {state: 1}}, function (err){
            if (err) return next(err);
            return next()
        })
    };
};
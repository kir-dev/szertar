var objectRepository = require('../../models/objectRepository');
var rentModel = objectRepository.rentModel;

module.exports = function () {
    return function (req, res, next) {
        console.log(req.params.id)
        rentModel.findOneAndUpdate({_id: req.params.id}, {state: 3}, function (err){
            if (err) return next(err);
            return next();
        })
    };
};
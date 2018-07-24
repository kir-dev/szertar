var objectRepository = require('../../models/objectRepository')
var rentModel = objectRepository.rentModel

module.exports = function () {
    return function (req, res, next) {
        console.log(req.body.id)
        rentModel.findOneAndUpdate({_id: req.body.id, state: 0}, {state: 1}, function (err){
            if (err) return next(err);
            return next();
        })
    };
};
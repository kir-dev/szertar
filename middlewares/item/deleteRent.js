var objectRepository = require('../../models/objectRepository');
var rentModel = objectRepository.rentModel;

module.exports = function () {
    return function (req, res, next) {     
        rentModel.findByIdAndRemove(
           req.params.id
        , function (err) {
            if (err) {
                return next(err);
            }           
            return next();
        });
    };
};
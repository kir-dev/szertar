var objectRepository = require('../../models/objectRepository');
var userModel = objectRepository.userModel;

module.exports = function () {
    return function (req, res, next) {     
        userModel.findByIdAndRemove(
           req.params.id
        , function (err) {
            if (err) {
                return next(err);
            }           
            return next();
        });
    };
};
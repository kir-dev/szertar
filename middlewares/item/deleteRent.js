var objectRepository = require('../../models/objectRepository');
var rentModel = objectRepository.rentModel;
var userModel = objectRepository.userModel

module.exports = function () {
    return function (req, res, next) {
        rentModel.findById(req.params.id, (err, rent)=>{
            userModel.findByIdAndUpdate(rent.user, {$inc: {inRent: -1}}, (err, res)=>{
                if(err) return next(err)
            })
        })     
        rentModel.findByIdAndRemove(
           req.params.id
        , function (err) {
            if (err) {
                return next(err);
            }           
            return next();
        })
    };
};
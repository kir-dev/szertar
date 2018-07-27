var objectRepository = require('../../models/objectRepository');
var rentModel = objectRepository.rentModel;

module.exports = function () {
    return function (req, res, next) {
        console.log(req.params.id)
        rentModel.findOneAndUpdate({_id: req.params.id}, {isRented: true, $inc: {state: 1}}, function (err){
            if (err) return next(err);
            for(var i in req.app.locals.userConnections){
                req.app.locals.userConnections[i].sseSend({msg: 'Kölcsönzésed állapota módosult!'})
            }
            return next();
        })
    };
};
var objectRepository = require('../../models/objectRepository');
var rentModel = objectRepository.rentModel;

module.exports = function () {
    return function (req, res, next) {
        rentModel.findOneAndUpdate({_id: req.params.id, state: 3}, {state: 4}, function (err, res){
            if (err || !res) return next(err);
            var text = {title: 'Eszköz leadás', body: req.user.name+' eszközt adna le'}
            adminSSE.send(text)
            return next()
        })
    };
};
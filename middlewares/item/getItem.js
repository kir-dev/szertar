var objectRepository = require('../../models/objectRepository');

module.exports = function () {
    var items = objectRepository.itemModel;

    return function (req, res, next) {
        items.findOne({
            _id: req.params.id
        }, function (err, item) {
            if (err) {
                console.log("error:" + err);
                return next(err);
            }
            req.item = item;
            return next();
        });
    }
};
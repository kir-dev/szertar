var objectRepository = require('../../models/objectRepository');
var itemModel = objectRepository.itemModel;

var listItems = function () {
    return function (req, res, next) {
        itemModel.find({}, function (err, items) {
            if (err) throw err;

            req.items = items;
            return next();
        });
    };
};

module.exports = listItems;
var requireOption = require('../requireOption');

module.exports = function (objectRepository) {

    var itemModel = requireOption(objectRepository, 'itemModel');

    return function (req, res, next) {
        itemModel.find({}, function (err, items) {
            if (err) return console.log(err);
            res.tpl.items = items;
            next();
        });
    }
};

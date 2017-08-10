var requireOption = require('../requireOption');

module.exports = function (objectRepository) {

    var itemModel = requireOption(objectRepository, 'itemModel');

    return function (req, res, next) {
        var name = req.body.item;
        var count = parseInt(req.body.count, 10);
        itemModel.findOne({name: name}, function (err, item) {
            if (err || !item) return console.log(err);
            if (count > item.count) {
                return next();
            }
            item.count -= count;
            item.save(function(err) {
                if (err) return console.log(err);
                next();
            });
        });
    }
};

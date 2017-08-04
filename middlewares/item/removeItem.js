module.exports = function (dal) {
    return function (req, res, next) {
        var name = req.body.item;
        var count = parseInt(req.body.count, 10);
        var Item = dal.model;
        Item.findOne({name: name}, function (err, item) {
            if (err || item == null) return console.log(err);
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

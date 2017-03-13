module.exports = function (dal) {
    return function (req, res, next) {
        var Item = dal.model;
        Item.find({}, function (err, items) {
            if (err) return console.log(err);
            req.items = items;
            next();
        });
    }
};

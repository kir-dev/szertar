module.exports = function (dal) {
    return function (req, res, next) {
        var Item = dal.model;
        Item.findOne({name: req.body.item}, function (err, item) {
            if (err) {
                console.log(err);
                return next();
            }
            req.item = item;
            next();
        });
    }
};

module.exports = function () {
    return function (req, res, next) {
        req.item.save(function (err) {
            if (err) console.log(err);
            return next();
        });
    }
};
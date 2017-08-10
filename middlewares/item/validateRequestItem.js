module.exports = function () {
    return function (req, res, next) {
        var name = req.body.item;
        if (name === "newItem" && (!req.body.newItem || !req.body.count)) {
            return next();
        }
        return next();
    }
};

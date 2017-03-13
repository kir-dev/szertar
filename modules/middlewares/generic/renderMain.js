module.exports = function () {
    return function (req, res, next) {
        res.render("pages/main", {
            message: req.message,
            items: req.items
        });
    };
};

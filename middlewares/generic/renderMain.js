module.exports = function () {
    return function (req, res, next) {
        res.render("pages/main", {
            message: res.tpl.message,
            items: res.tpl.items
        });
    };
};

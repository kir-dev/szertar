var express = require('express');
var router = express.Router();

module.exports = function (dal) {
    // router.use('/',
    //     function (req, res, next) {
    //     }
    // );

    router.use('/',
        function (req, res, next) {
            res.render("pages/login");
        }
    );

    return router;
};

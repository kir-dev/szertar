var express = require('express');
var router = express.Router();
var renderMainMW = require('../middlewares/generic/renderMain');
var validateRequestItemMW = require('../middlewares/item/validateRequestItem');
var removeItemMW= require('../middlewares/item/removeItem');
var listItemsMW = require('../middlewares/item/listItems');
var findItemMW = require('../middlewares/item/findItem');
var updateItemMW = require('../middlewares/item/updateItem');
var saveItemMW = require('../middlewares/item/saveItem');

module.exports = function (dal) {

    router.get('/', 
        listItemsMW(dal),
        renderMainMW()
    );

    router.post('/', 
        validateRequestItemMW(dal),
        findItemMW(dal),
        updateItemMW(dal),
        saveItemMW(dal),
        function(req, res, next) {
            res.redirect('/');
        }
    );

    router.post('/delete',
        removeItemMW(dal),
        function(req, res, next) {
            res.redirect('/');
        }
    );

    return router;
};


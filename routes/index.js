var express = require('express');
var router = express.Router();
var renderMainMW = require('../modules/middlewares/generic/renderMain');
var addItemMW = require('../modules/middlewares/item/addItem');
var removeItemMW= require('../modules/middlewares/item/removeItem');
var listItemsMW = require('../modules/middlewares/item/listItems');


module.exports = function (dal) {

    router.get('/', listItemsMW(dal),
        renderMainMW()
    );

    router.post('/', addItemMW(dal),
        listItemsMW(dal),
        renderMainMW()
    );

    router.post('/delete', removeItemMW(dal),
        listItemsMW(dal),
        renderMainMW()
    );

    return router;
};


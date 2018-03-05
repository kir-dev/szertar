var express = require('express');
var router = express.Router();
var renderMainMW = require('../middlewares/generic/renderMain');
var validateRequestItemMW = require('../middlewares/item/validateRequestItem');
var removeItemMW= require('../middlewares/item/removeItem');
var listItemsMW = require('../middlewares/item/listItems');
var findItemMW = require('../middlewares/item/findItem');
var updateItemMW = require('../middlewares/item/updateItem');

var objectRepository = require('../models/objectRepository');

module.exports = function () {

    router.get('/', 
        listItemsMW(objectRepository),
        renderMainMW()
    );

    router.post('/',
        updateItemMW(),
        function(req, res) {
            res.redirect('/');
        }
    );

    router.post('/delete',
        removeItemMW(objectRepository),
        function(req, res, next) {
            res.redirect('/');
        }
    );

    return router;
};


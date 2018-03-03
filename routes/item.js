var express = require('express');
var updateItemMW = require('../middlewares/item/updateItem');
var findItemMW = require('../middlewares/item/findItem');
var validateRequestItemMW = require('../middlewares/item/validateRequestItem');
var increaseItemMW = require('../middlewares/item/increaseItem');
var decreaseItemMW = require('../middlewares/item/decreaseItem');
var router = express.Router();
var itemModel = require('../models/item');


module.exports = function () {


    var objectRepository = {
        itemModel: itemModel
    };


    router.post('/',
      //  validateRequestItemMW(),
        findItemMW(objectRepository),
        updateItemMW(objectRepository),
        function (req, res, next) {
            res.redirect('/');
        }
    );
    router.post('/increase',
       // validateRequestItemMW(),
        findItemMW(objectRepository),
        increaseItemMW(objectRepository)
    );
    router.post('/decrease',
      //  validateRequestItemMW(),
        findItemMW(objectRepository),
        decreaseItemMW(objectRepository)
    );

    return router;
};

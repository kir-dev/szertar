var express = require('express');
var router = express.Router();
var objectRepository = require('../models/objectRepository');
var updateItemMW = require('../middlewares/item/updateItem');
var findItemMW = require('../middlewares/item/findItem');
var validateRequestItemMW = require('../middlewares/item/validateRequestItem');
var increaseItemMW = require('../middlewares/item/increaseItem');
var decreaseItemMW = require('../middlewares/item/decreaseItem');

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

module.exports = router;
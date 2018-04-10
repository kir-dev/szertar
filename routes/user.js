var express = require('express');
var router = express.Router();

router.get('/rents',
    (req, res) => {
        res.render('pages/rents');
    }
);

router.get('/cart',
    (req, res) => {
        res.render('pages/cart');
    }
);

module.exports = router;
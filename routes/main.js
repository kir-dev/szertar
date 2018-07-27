var express = require('express');
var router = express.Router();
var getAllItems = require('../middlewares/item/getAllItems');
var renderMain = require('../middlewares/generic/renderMain');
var requireAdmin = require('../middlewares/user/requireAdmin');
var requireAuth = require('../middlewares/user/requireAuthentication')

/* GET home page. */
router.get('/',
    getAllItems(),
    renderMain()
);

router.get('/admin',
    requireAdmin(),
    getAllItems(),
    function (req, res) {
        res.render('pages/admin', {
            items: req.items
        });
    });

router.get('/about',
    (req, res) => {
        res.render('pages/about');
    }
);

router.get('/adminSSE', requireAdmin(), function(req, res){
    res.sseSetup()
    req.app.locals.adminConnections[req.user._id] = res
})

router.get('/userSSE', requireAuth, function(req, res){
    res.sseSetup()
    req.app.locals.userConnections[req.user._id] = res
})

module.exports = router;
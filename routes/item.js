var express = require('express');
var router = express.Router();

var getItem = require('../middlewares/item/getItem');
var newItem = require('../middlewares/item/newItem');
var editItem = require('../middlewares/item/editItem');
var deleteItem = require('../middlewares/item/deleteItem');
var requireAdmin = require('../middlewares/user/requireAdmin');
var requireAuth = require('../middlewares/user/requireAuthentication');
var rentItem = require('../middlewares/item/rentItem');
var getAllItem = require('../middlewares/item/getAllItems');
var renderMain = require('../middlewares/generic/renderMain');
var multer  = require('multer')
var upload = multer({ dest: './upload/' })
var sharp = require('sharp')

router.post('/create', requireAdmin(), upload.single("img"), newItem(), function (req, res) {
    if(req.file) sharp(req.file.path).webp({ lossless: true }).resize(200, 200).toFile('./public/img/'+req.file.filename,(err, info) => {
        console.log(err)
        res.redirect('/admin/items')
    })
    else
    res.redirect('/admin/items')
});

router.post('/edit', requireAdmin(), getItem(), editItem(), function (req, res) {
    res.redirect('/admin/items');
});

router.delete('/:id', requireAdmin(), deleteItem(), function (req, res) {
    res.status(200).end();
});

router.post('/rent', requireAuth, rentItem(), function(req, res){
    res.redirect('/')
});
module.exports = router;
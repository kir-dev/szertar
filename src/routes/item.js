var express = require('express')
var router = express.Router()
var getItem = require('../middlewares/item/getItem')
var newItem = require('../middlewares/item/newItem')
var editItem = require('../middlewares/item/editItem')
var deleteItem = require('../middlewares/item/deleteItem')
var requireAdmin = require('../middlewares/user/requireAdmin')
var requireAuth = require('../middlewares/user/requireAuthentication')
var rentItem = require('../middlewares/item/rentItem')
var multer = require('multer')
var upload = multer({ dest: './upload/' })
var sharp = require('sharp')

router.post(
  '/create',
  requireAdmin(),
  upload.single('img'),
  newItem(),
  (req, res) => {
    if (req.file)
      sharp(req.file.path)
        .png({ quality: 100 })
        .resize(400, 400)
        .toFile('./public/img/' + req.file.filename + '.png', () => {
          res.redirect('/admin/items')
        })
    else res.redirect('/admin/items')
  }
)

router.post('/edit', requireAdmin(), getItem(), editItem(), (req, res) => {
  res.redirect('/admin/items')
})

router.delete('/:id', requireAdmin(), deleteItem(), (req, res) => {
  res.status(200).end()
})

router.post('/rent', requireAuth, rentItem(), (req, res) => {
  res.redirect('/#' + req.body.row)
})
module.exports = router

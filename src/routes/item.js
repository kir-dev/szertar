const express = require('express')
const router = express.Router()
const getItem = require('../middlewares/item/getItem')
const newItem = require('../middlewares/item/newItem')
const editItem = require('../middlewares/item/editItem')
const deleteItem = require('../middlewares/item/deleteItem')
const requireAdmin = require('../middlewares/user/requireAdmin')
const requireAuth = require('../middlewares/user/requireAuthentication')
const rentItem = require('../middlewares/item/rentItem')
const multer = require('multer')
const upload = multer({ dest: './upload/' })
const sharp = require('sharp')

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

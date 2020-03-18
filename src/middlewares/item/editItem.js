module.exports = function() {
  return function(req, res, next) {
    const count = req.body.count
    const stock = req.body.stock
    const name = req.body.name

    if (!req.item) return next()

    req.item.count = parseInt(count, 10)
    req.item.name = name
    req.item.stock = parseInt(stock, 10)

    req.item.save(err => {
      if (err) return next(err)
      return next()
    })
  }
}

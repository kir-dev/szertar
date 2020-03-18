module.exports = function() {
  return function(req, res) {
    const itemRows = []
    const chunkSize = 3
    for (let i = 0; i < req.items.length; i += chunkSize) {
      itemRows.push(req.items.slice(i, i + chunkSize))
    }

    res.render('pages/main', {
      itemRows: itemRows
    })
  }
}

var objectRepository = require('../../models/objectRepository')
var rentModel = objectRepository.rentModel
var moment = require('moment')

moment.locale('hu')

module.exports = function() {
  return function(req, res, next) {
    var week = req.params.week || undefined
    rentModel.find(
      {
        updatedAt: {
          $gte: moment(week)
            .startOf('isoweek')
            .format(),
          $lt: moment(week)
            .endOf('isoweek')
            .format()
        },
        state: { $gte: 1 }
      },
      (err, res) => {
        var days = [0, 0, 0, 0, 0, 0, 0]
        var len = 0
        res.forEach(rent => {
          days[moment(rent.updatedAt).weekday()]++
          len++
        })
        req.weekRents = res
        req.weekRents.rentsLen = len
        req.weekRents.days = days
        req.weekRents.week = week
        return next()
      }
    )
  }
}

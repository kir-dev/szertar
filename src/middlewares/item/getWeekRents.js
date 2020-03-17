const objectRepository = require('../../models/objectRepository')
const rentModel = objectRepository.rentModel
const moment = require('moment')

moment.locale('hu')

module.exports = function() {
  return function(req, res, next) {
    const week = req.params.week || undefined
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
        const days = [0, 0, 0, 0, 0, 0, 0]
        res.forEach(rent => days[moment(rent.updatedAt).weekday()]++)
        req.weekRents = res
        req.weekRents.rentsLen = res.length
        req.weekRents.days = days
        req.weekRents.week = week
        return next()
      }
    )
  }
}

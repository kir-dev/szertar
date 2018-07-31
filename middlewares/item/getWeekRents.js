var objectRepository = require('../../models/objectRepository')
var rentModel = objectRepository.rentModel
var moment = require('moment')
moment.locale('hu')
module.exports = function(){
    return function(req, res, next){
        rentModel.find({updatedAt: {$gte: moment().startOf('isoweek').format(), $lt: moment().endOf('isoweek').format()}, state: {$gte: 1}}, (err, res) => {
            var days = [0,0,0,0,0,0,0]
            var len = 0
            res.forEach(rent =>{
                days[moment(rent.updatedAt).weekday()]++
                len++
            })
            req.weekRents = res
            req.weekRents.rentsLen = len
            req.weekRents.days = days
            return next()
        })
    }
}
var nodeMailer = require('nodemailer')
var config = require('../../config/config')

module.exports = function(txt, html, subj = '', to=''){
    return function(req, res, next){
        var transporter = nodeMailer.createTransport({
            port: config.emailPort,
            ignoreTLS: true,
            host: config.emailHost
        })
        var mailOptions = {
            from: '"SCH Szertár" <noreply@example.com>', // sender address
            to: 'Test <noreply@example.com>', // list of receivers
            subject: '[SCH Szertár] '+ subj, // Subject line
            text: txt, // plain text body
            html: html // html body
        }
        transporter.sendMail(mailOptions, (err, info) => {
            console.log('==nodemailer')
            if(err){
                console.error(err)
                if(!next) return
                else return next()
            }
            console.log('Message %s sent: %s', info.messageId, info.response)
            if(!next) return
            else return next()
        })
    }
}
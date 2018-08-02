var nodeMailer = require('nodemailer')

module.exports = function(txt, html, subj = '', to=''){
    return function(req, res, next){
        var transporter = nodeMailer.createTransport({
            port: 1025,
            ignoreTLS: true,
            host: 'localhost'
        })
        var mailOptions = {
            from: '"SCH Szertár" <noreply@example.com>', // sender address
            to: 'Test <noreply@example.com>', // list of receivers
            subject: '[SCH Szertár] '+subj, // Subject line
            text: txt, // plain text body
            html: html // html body
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log(err)
                if(!next) return
                else return next()
            }
            console.log('==nodemailer')
            console.log('Message %s sent: %s', info.messageId, info.response)
            if(!next) return
            else return next()
        })
    }
}
var nodeMailer = require('nodemailer')
var transporter = nodeMailer.createTransport({
    port: 1025,
    ignoreTLS: true,
    host: 'localhost'
})

module.exports = function(txt, html, subj = '', ){
    return function(req, res, next){
        var mailOptions = {
            from: '"SCH Szertár" <xx@gmail.com>', // sender address
            to: 'Test <noreply@example.com>', // list of receivers
            subject: '[SCH Szertár] '+subj, // Subject line
            text: txt, // plain text body
            html: html // html body
        }
        console.log('==nodemailer')
        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                if(!next) return
                console.log(err)
                return next()
            }
            console.log('Message %s sent: %s', info.messageId, info.response)
            return next()
        })
    }
}
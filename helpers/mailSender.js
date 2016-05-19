var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Yandex',
    auth: {
        user: 'chatrovsite@yandex.ru',
        pass: '654321q'
    }
});

/**
 * send email
 * @param object with subject, email, text params
 * @returns {*}
 */
module.exports = function (paramns) {
    var mailOptions = {
        from: 'chatrovsite@yandex.ru' // sender address
    };

    mailOptions.subject = paramns.subject;
    mailOptions.html = paramns.html;
    mailOptions.to = paramns.to;

    return transporter.sendMail(mailOptions, function(error, info){
        if(error){
            throw err;
        }
        console.log('Message sent: ' + info.response);
    });
};
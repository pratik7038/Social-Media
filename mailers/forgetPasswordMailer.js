const nodemailer = require('../config/nodemailer')

exports.resetLink = (data)=>{
    
    let htmlTemplate = nodemailer.renderTemplate({data:data},"/forget-password/reset-password-mail.ejs") 

     nodemailer.transporter.sendMail({
        from:"pratikpatharkar123@gmail.com",
        to:data.email,
        subject:"Password Reset Link",
        text:"hello world",
        html:htmlTemplate
    });

}

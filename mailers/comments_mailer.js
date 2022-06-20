const nodemailer = require('../config/nodemailer')
 
///new way to export 
exports.newComment = (comment)=>{
    
    let htmlTemplate = nodemailer.renderTemplate({comment:comment},"/comments/new_comment.ejs") 

     nodemailer.transporter.sendMail({
        from:"pratikpatharkar123@gmail.com",
        to:"patharkar.ss@gmail.com",
        subject:"test",
        text:"hello world",
        html:htmlTemplate
    });

}
const kue = require('kue')

const queue = kue.createQueue();


module.exports = queue
// const commentMailer = require('../mailers/comments_mailer')

// queue.process('emails',function(job,done){
//     console.log('emails worker is processing the job ',job.data);

//     commentMailer.newComment(job.data);

//     done(); 
// })

const { redirect } = require("express/lib/response")
const Comment = require("../models/comment")
const Post = require('../models/post')
const commentMailer = require('../mailers/comments_mailer')
const commentEmailWorker = require('../workers/comment_email_worker')

const queue = require('../config/kue')

module.exports.create = async function (req, res) { 
    var new_comment = {
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
    }
    let post = await Post.findById(req.body.post)

    let comment = await Comment.create(new_comment) 
    await post.comments.push(comment)
    await post.save()
    comment = await comment.populate('user','name email')  

    let job = queue.create('emails',comment).save(function(err){
        if(err){console.log("error in sending to the queue ",err );return;}
        console.log('job enqued ',job.id)
    }) 

    if (req.xhr) { 
        return res.status(200).json({
            data: {
                comment: comment
            },
            message: "comment created!"
        });
    } 
    req.flash('success', 'Comment published!');
    res.redirect('/')
}

module.exports.destroy = function (req, res) {

    Comment.findById(req.params.id, function (err, comment) {

        if (comment.user == req.user.id) {
            let postId = comment.post
            comment.remove()

            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
                return res.redirect('back')

            })

        }
        else {
            return res.redirect('back')
        }

    });


    ///check the authorization
}
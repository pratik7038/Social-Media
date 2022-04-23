 
const { redirect } = require("express/lib/response")
const Comment = require("../models/comment")
const Post = require('../models/post')

module.exports.create = function(req,res){
   
    var comment = {
        content : req.body.content,
        post : req.body.post,
        user: req.user._id
    }

    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create(comment, function(err,comment){
                ///error handling
                if(err){console.log(err)}
                comment.save()
                ///updating the commentId in the post document 
                post.comments.push(comment)
                post.save()

                res.redirect('/')

            })

        }

    })      

}

module.exports.destroy = function(req,res){
    
    Comment.findById(req.params.id,function(err,comment){
         
        if(comment.user == req.user.id)
        {
                let postId = comment.post
                comment.remove()

                Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                    return res.redirect('back')

                })

        }
        else{
            return res.redirect('back')
        }

    });
    

    ///check the authorization
}
const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/User')
const { post } = require('../routes')


module.exports.create = async function (req, res) { 

    try{  
        let post = await Post.create({
            content: req.body.post, 
            user: res.locals.user.id
        })

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message: "Post Created!"
            })
        }


        req.flash('success','Post Published')
        return res.redirect('back')
    }
    catch(err){
        req.flash('success',err)
        return
    }

}


module.exports.destroy = function (req, res) {
    
    Post.findById(req.params.id, function (err, post) {
        if (post.user == req.user.id) {
            post.remove()

            Comment.deleteMany({ post: req.params.id }, function (err) {
                req.flash('success','Post deleted successfully')
                return res.redirect("back")
            })
        }

        else {
            req.flash('error',"you cannot delete others post")
            return res.redirect('back')
        }

    })
}
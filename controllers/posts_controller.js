const Post = require('../models/post')

const User = require('../models/User')

module.exports.create = function(req,res)
{    
    console.log(res.locals.user.id)
    var user_id = res.locals.user.id
    User.findById( {_id: res.locals.user.id} , function(err,user){
        var post = {
            content : req.body.post,
            user:res.locals.user.id 
        };

        console.log(post)
        
        Post.create(post,function(err,post){
               if(err){console.log("error in posting ",err)}
                   post.save()   
           })

    });

    res.redirect('back')

}
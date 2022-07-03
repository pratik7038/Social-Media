const Like = require('../models/like')
const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.toogleLike = async function(req,res)
{
    console.log(req.query)
    try{
        ///likes/toggle/?id=abcdef&type=Post
        let likable ;
        let deleted = false;


        if(req.query.type == 'Post')
        {
            likable = await Post.findById(req.query.Id).populate('likes')
        }
        else{
            likable = await Comment.findById(req.query.Id).populate('likes')
        }

        ///check if like is already there
        let existingLike = await Like.findOne({
            likable:req.query.id,
            onModel: req.query.type,
            user:req.user._id
        })

        ///if like already exists then delete it
        if(existingLike){
            likable.likes.pull(existingLike._id);
            likable.save();

            existingLike.remove();
        }
        else{
        // ///else make a new like
            let newLike =  await Like.create({
                user:req.user._id,
                likable:req.query.id,
                onModel: req.query.type
            }); 

            likable.likes.push(newLike._id);
            likable.save();
        }

        return res.json(200,{
            message:"Request successful",
            data:{
                deleted:deleted
            }
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
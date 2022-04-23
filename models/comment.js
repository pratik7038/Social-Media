const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({

    content:{
        type:String,
        required:true
    },
    ///comment belongs to which user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    ///comments made on the post
    post: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps: true
});

const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment
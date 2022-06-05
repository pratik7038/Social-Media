const express = require("express")

const Post = require('../models/post')

const User = require('../models/User')

module.exports.home = async function (req, res) {
    
    try {
            let posts = await Post.find({})
                .populate('user')
                .populate({
                    path: 'comments'
                });
            
            let users = await User.find({});
                 
            return res.render('home', {
                title: "My Home Page",
                posts: posts,
                all_users: users 
            })
    }
    catch (err) {
        console.log("error", err)
    }
}


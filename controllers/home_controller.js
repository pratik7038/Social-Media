const express = require("express")
const Post = require('../models/post')
const User = require('../models/User')
const Friendship = require('../models/friendship')

module.exports.home = async function (req, res) {
    
    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate: {
                    path: 'likes'
                }
            })
            .populate('likes');

        let users = await User.find({});
        let friends = []

        if (req.user) {
            let user = await User.findById(req.user._id).populate('friendships');
            
            let friends_array = user.friendships
            let to_users_array = []
            for(let element of friends_array)
            {
                to_users_array.push(element.to_user)
            } 
            for(let element of to_users_array)
            {
                let friend = await User.findById(element)
                friends.push(friend);
            } 
        }  
        return res.render('home', {
            title: "My Home Page",
            posts: posts,
            all_users: users,
            friends : friends
        })
    }
    catch (err) {
        console.log("error", err)
    }
}
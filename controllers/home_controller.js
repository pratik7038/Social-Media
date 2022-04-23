const express = require("express")

const Post = require('../models/post')

module.exports.home = function(req,res){
    
    if (req.user) {
        // logged in
        let user_id = res.locals.user.id;

        Post.find({user:user_id})
        .populate('user')
        .populate({
            path:'comments'
        })
        .exec(function(err,posts){  
                res.render('home',{
                   title:"My Home Page",
                   post : posts,
                   
           }) 
        })


    } else {
        console.log("user not logged in")
        res.redirect("/users/sign-in")
    }
    
    

}


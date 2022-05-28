const { redirect } = require("express/lib/response");
const { session } = require("passport/lib");
const User = require("../models/User")
const Post = require('../models/post')

module.exports.user = function(req,res){

    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"My Codial",
            user: user
        });
    })
    
}

module.exports.signUp = function(req,res){
    return res.render('signUp',{
        title:"signUp"
    });
}

module.exports.signUp_post = function(req,res){

    var user = {
        email:req.body.email,
        password:req.body.password,
        name:req.body.name
    } 

    User.create(user,function(err,user){
        if(err)console.log(err);
        user.save();
    })
  
    return res.render('signUp',{
        title:"signedUp successfully"
    });
}

module.exports.signIn = function(req,res)
{
    return res.render("user-sign-in",{
        title:"sign in page",
    })
}

module.exports.createSession = async function(req,res){

    await req.flash('success','Logged in successfully')

    return res.redirect('/')
}

module.exports.destorySession = function(req,res)
{
    req.flash('success','Logged out successfully')
    
    req.logout();
    return res.redirect("/")

}

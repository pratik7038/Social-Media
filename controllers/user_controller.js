
const { redirect } = require("express/lib/response");
const { session } = require("passport/lib");
const User = require("../models/User")

module.exports.user = function(req,res){
    return res.render('user_profile',{
        title:"My Codial",
        user: req.user
    });
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

module.exports.createSession = function(req,res){
    console.log(res.locals.user);
    return res.render('user_profile',{
         title:"My profile page",
         user: req.user
        })
}

module.exports.destorySession = function(req,res)
{
    req.logout();
    res.redirect("sign-in")
}
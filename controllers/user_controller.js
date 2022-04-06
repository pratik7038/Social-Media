
const User = require("../models/User")

module.exports.user = function(req,res){
    return res.render('user_profile',{
        title:"My Codial"
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

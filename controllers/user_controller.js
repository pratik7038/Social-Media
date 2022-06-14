const { redirect } = require("express/lib/response");
const { session } = require("passport/lib");
const User = require("../models/User")
const Post = require('../models/post');
const e = require("connect-flash");

const fs = require("fs") 
const path = require('path')

module.exports.user = function(req,res){ 

    User.findById(req.params.id,function(err ,user){
        return res.render('user_profile',{
            title:"My Codial",
            profile_user: user
        });
    }) 
}

module.exports.update = async function(req,res){ 
    
    console.log("Hey there im using js") 

    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         req.flash('success','Updated!')
    //         return res.redirect('back');
    //     });
    // }
    // else
    // {
    //     req.flash('error','Unauthorized')
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
        
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res, function(err){
                if(err){
                    console.log("**********multer err**********",err)
                }
                else{
                    console.log(req.file)
                    user.name = req.body.name;
                    user.email = req.body.email;
                    if(req.file){
                        if (user.avatar) {
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                            //fs.unlinkSync - delete a name and possibly the file it refers to.
                        }
                        user.avatar = User.avatarPath + '/' + req.file.filename
                    }
                    user.save();
                    return res.redirect('back')
                }
            })
        }
        catch(err){
            
            req.flash('error',err)
            return res.redirect('back');
        }
    }
    else{
        
         req.flash('error','Unauthorized')
         return res.status(401).send('Unauthorized');
    }

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

const { redirect } = require("express/lib/response");
const { session } = require("passport/lib");
const User = require("../models/User")
const Post = require('../models/post');
const Friendship = require("../models/friendship");
const ForgetPassword = require('../models/ForgetPassword')
const ForgetPasswordMailer = require('../mailers/forgetPasswordMailer')
const e = require("connect-flash");

const fs = require("fs")
const path = require('path')
const crypto = require('crypto');

module.exports.user = async function (req, res) {
    try {
        let user = await User.findById(req.params.id)
        return res.render('user_profile', {
            title: "My Codial",
            profile_user: user
        })
    }
    catch (err) {
        console.log(err);
    }

}

module.exports.update = async function (req, res) {

    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log("**********multer err**********", err)
                }
                else {
                    console.log(req.file)
                    user.name = req.body.name;
                    user.email = req.body.email;
                    if (req.file) {
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
        catch (err) {
            req.flash('error', err)
            return res.redirect('back');
        }
    }
    else {
        req.flash('error', 'Unauthorized')
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signUp = function (req, res) {
    return res.render('signUp', {
        title: "signUp"
    });
}

module.exports.signUp_post = function (req, res) {
    var user = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    }
    User.create(user, function (err, user) {
        if (err) { console.log(err); return; }
        user.save();
    })

    return res.render('signUp', {
        title: "signedUp successfully"
    });
}

module.exports.signIn = function (req, res) {
    return res.render("user-sign-in", {
        title: "sign in page",
    })
}

module.exports.createSession = async function (req, res) {
    await req.flash('success', 'Logged in successfully')
    return res.redirect('/')
}

module.exports.destorySession = function (req, res) {
    req.flash('success', 'Logged out successfully')

    req.logout();
    return res.redirect("/")
}

module.exports.forgetPassword = function (req, res) {
    return res.render('forget-password', {
        title: "forgetPassword"
    })
}

exports.generateAccessToken = async function (req, res) {
    let user = await User.findOne({ email: req.body.email });
    if (!user) { return res.send("<h1>User Does Not Exists</h1>") }
    let random_value = crypto.randomBytes(20).toString('hex')
    await ForgetPassword.create({
        email: req.body.email,
        token: random_value,
        isValid: true
    })

    let data = {
        email: req.body.email,
        token: random_value
    }
    ForgetPasswordMailer.resetLink(data)
    return res.send("<h1>Reset password link is sent on the registered email address</h1>")
}

exports.setNewPassword = async function (req, res) {
    await console.log(req.query.token)
    let access = false;
    ////forget password model's object
    let obj = await ForgetPassword.findOne({ token: req.query.token })

    ///for handling it in view
    console.log(obj)
    if (obj.isValid) { access = true }
    obj.isValid = false
    obj.save()

    return res.render('new-password',
        {
            title: "update password",
            obj: obj,
            access: access
        });
}

exports.updatePassword = async (req, res) => {
    if (req.body.new_password != req.body.confirm_password) {
        return res.send("<h1> Both Password Should Match </h1>")
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log(err) }
        // console.log(user)
        user.password = req.body.new_password;
        user.save()
    })
    return res.redirect('/')
}

exports.addFriend = async (req, res) => {

    try {
        let friendship_obj = {
            from_user: req.user._id,
            to_user: req.body.friendId
        }
        let isExists = await Friendship.findOneAndDelete(friendship_obj) /// remove the friendship if exists
        if (isExists) {  
            await req.flash('success', 'Friendship Removed') 
        }
        else{
            let friendship = await Friendship.create(friendship_obj)
            let user = req.user;
            user.friendships.push(friendship.id)
            user.save()
            await req.flash('success', 'Friendship Established')
        }
 
        return res.redirect('/')
    }
    catch (err) {
        console.log(err)
    }
}
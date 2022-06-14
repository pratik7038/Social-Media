const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy

const crypto = require('crypto')
const User = require('../models/User')
const { redirect } = require('express/lib/response')


///tell passport to use new strategy for google login 
passport.use(new googleStrategy({
    clientID: "523775786556-6s80kl4jcg3kvmptp6oe5iljh39ulmof.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},

    function (accessToken, refreshToken, profile, done) {
        
        //find the user 
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) { console.log("error in google Strategy", err); return}
            console.log(profile._json.sub);

            if (user) {
                /// if found, set this user as req.user
                return done(null, user);
            }
            else {
                ///if not found , create user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user) {
                    if (err) {
                        console.log("error in creating the user through g oauth",err); 
                        return; 
                    } 
                    return done(null, user);
                })
            }
        })
    }
))

module.exports = passport

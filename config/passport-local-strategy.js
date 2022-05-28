const passport = require("passport")

const LocalStrategy = require("passport-local").Strategy

const User = require('../models/User')

///authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
    },
    function(req,email,password,done){
        ///find the user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err)
                return done(err);
            }

            else if(!user || user.password != password){
                req.flash('error',"Invalid User or Password")
                return done(null,false);
            }
            else{
                return done(null,user);
            }
        })
    }
    ))

    ////serializing the user to decide which key should be kept in the cookies
    passport.serializeUser(function(user,done){
        done(null,user.id);    
    })

    ////deserializing the user from session
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            if(err){
                console.log("error in finding the user")
                done(err);
            }
        
            done(null,user);
            return
        });
    })


///check if the user is authenticated
passport.checkAuthentication = function(req,res,next){

    ///if user is signed in, then pass the request to the next function controllers action
     if(req.isAuthenticated())
     {
         return next();
     }

     ///if the user not signed in
     else
        res.redirect("/users/sign-in")

}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        ///req.user containes the current signed in user from the session cookies
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport
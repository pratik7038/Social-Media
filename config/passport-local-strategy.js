const passport = require("passport")

const LocalStrategy = require("passport-local").Strategy

const User = require('../models/User')

///authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email' 
    },
    function(email,password,done){
        ///find the user and establish the identity
        
    }


))
const express = require("express")

const router = express.Router();
const passport = require('passport')
const userController = require("../controllers/user_controller.js")

router.get("/profile/:id",passport.checkAuthentication,userController.user)
router.post("/update/:id" ,userController.update) 
router.get("/sign-up",userController.signUp)
router.post("/sign-up",userController.signUp_post)
router.get('/sign-in',userController.signIn)
router.get('/sign-out',userController.destorySession)

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect : '/users/sign-in'}),userController.createSession)

///use passport as a middleware for authencation
router.post('/create-session',
            passport.authenticate('local',{failureRedirect:'/users/sign-in'})
            ,userController.createSession);

module.exports = router;

    
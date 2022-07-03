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

router.post('/addfriend',userController.addFriend)

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect : '/users/sign-in'}),userController.createSession)

///use passport as a middleware for authencation
router.post('/create-session',
            passport.authenticate('local',{failureRedirect:'/users/sign-in'})
            ,userController.createSession);
///forget password route
///1) for getting email for reseting password 
router.get('/forget-password',userController.forgetPassword)

///2) for generating access token
router.post('/forget-password',userController.generateAccessToken)

///3) for authencation and setting new password
router.get('/new-password',userController.setNewPassword)

router.post('/update-password',userController.updatePassword)

module.exports = router;   
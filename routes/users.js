const express = require("express")

const router = express.Router();
const passport = require('passport')
const userController = require("../controllers/user_controller.js")

router.get("/profile/:id",passport.checkAuthentication,userController.user)
router.get("/sign-up",userController.signUp)
router.post("/sign-up",userController.signUp_post)
router.get('/sign-in',userController.signIn)
router.get('/sign-out',userController.destorySession)
///use passport as a middleware for authencation
router.post('/create-session',
            passport.authenticate('local',{failureRedirect:'/users/sign-in'})
            ,userController.createSession);

module.exports = router;
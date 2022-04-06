const express = require("express")

const router = express.Router();

const userController = require("../controllers/user_controller.js")

router.get("/profile",userController.user)
router.get("/sign-up",userController.signUp)
router.post("/sign-up",userController.signUp_post)
module.exports = router;
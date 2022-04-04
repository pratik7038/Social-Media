const express = require("express")

const router = express.Router();

const userController = require("../controllers/user_controller.js")

router.get("/profile",userController.user)
router.get("/signUp",userController.signUp)
router.post("/signUp",userController.signUp_post)
module.exports = router;
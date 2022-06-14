const express = require("express");

const router = express.Router();

const homeController = require("../controllers/home_controller.js")

router.get('/',homeController.home);

router.use('/users',require("./users"))

router.use('/posts',require('./posts'))

router.use('/comments',require("./comments"))
 
router.use('/api',require('./api'))

///error request handler
router.get('*',(req,res)=>{return res.render('error',{
    title:"Page Not Found"
})});

module.exports = router;
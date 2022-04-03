const express = require("express")

module.exports.home = function(req,res){
    
    res.render('home',{
        title:"My home page"
    })

}



const User  = require('../../../models/User')
const jwt = require('jsonwebtoken')


module.exports.createSession = async function(req,res){

    try{
        let user  = await User.find({email:req.body.email});
        if(!user ){
            console.log(user)
            return res.status(422).json({
                message:"Invalid Username or password"
            })
        }

        return res.status(200).json({
            message:"sign in successful, here is ur token! please keep it safe",
            data:{
                token:jwt.sign(JSON.stringify(user) , 'codial' )
            }
        })
    }
    catch(err)
    {
        console.log(err)

    }
}

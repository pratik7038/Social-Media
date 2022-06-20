const mongoose = require('mongoose')

const ForgetPasswordSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true
    }
},{TimeStamps:true}
);

const ForgetPassword  = mongoose.model('ForgetPassword', ForgetPasswordSchema)

module.exports = ForgetPassword
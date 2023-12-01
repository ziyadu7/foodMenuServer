const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('user',userSchema)
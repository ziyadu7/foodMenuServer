const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({
    foodName:{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    subCategory:{
        type:Array
    }
})

module.exports = mongoose.model('menu',menuSchema)
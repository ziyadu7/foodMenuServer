const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({
    foodName:{
        type:String
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    subCategory:{
        type:Array
    }
})

module.exports = mongoose.model('menu',menuSchema)
const mongoose = require('mongoose')
require('dotenv').config()

module.exports.connectDb = ()=>{
    mongoose.connect(process.env.MONGOOSECONNECTION).then(()=>{
        console.log('databse connected');
    }).catch((err)=>{
        console.log(err+"database did't connected");
    }) 
}
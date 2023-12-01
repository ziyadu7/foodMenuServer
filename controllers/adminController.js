const sha256 = require('js-sha256');
const userModel = require('../models/userModel');
const { generateToken } = require('../middlewares/auth');
const menuModel = require('../models/menuModel');
require('dotenv').config()  

const adminLogin = async (req,res)=>{
    try {
        const {email,password} = req.body

        const admin = await userModel.findOne({ $and: [{ email }, { password: sha256(password + process.env.SALT) }] })
        if(!admin||admin?.isAdmin==false){
            return res.status(403).json({ errMsg: "Acess Denied" })
        }else{
            const token = generateToken(admin._id, 'admin')
            res.status(200).json({message:"Admin login success",token})
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({errMsg:"Server Error"})
    }
}

const addAdmin = async (req,res)=>{
    try {
        const {userId} = req.body
        await userModel.updateOne({_id:userId},{$set:{isAdmin:true}})
        res.status(200).json({message:"User role changed"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({errMsg:"Server Error"})
    }
}

module.exports = {
    adminLogin,
    addAdmin
}
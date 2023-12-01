const sha256 = require('js-sha256');
const userModel = require('../models/userModel');
const { generateToken } = require('../middlewares/auth');
require('dotenv').config()    

const register = async (req,res)=>{
    try {
        const {name,email,password} = req.body
        
        const isExist = await userModel.findOne({email:email})
        if(isExist){
            return res.status(409).json({errMsg:"User alredy exist"})
        }else{
            await userModel.create({
                name,email,password:sha256(password + process.env.SALT),isAdmin:false
            })
            return res.status(200).json({message:'User registered successfully'})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({errMsg:"Server Error"})
    }
}

const login = async (req,res)=>{
    try {

        const {email,password} = req.body
        const user = await userModel.findOne({ $and: [{ email }, { password: sha256(password + process.env.SALT) }] })

        if(user&&!user.isAdmin){
            const token = generateToken(user._id, 'user')
            res.status(200).json({ message: 'user login successfully',token})
        }else{
            return res.status(400).json({ errMsg: "Email and password not match" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({errMsg:"Server Error"})
    }
}

const editProfile = async (req,res)=>{
    try {

        const {newMail,newName} = req.body
        const {id} = req.payload

        const isExist = await userModel.findOne({email:newMail})

        if(isExist){
            return res.status(409).json({errMsg:"User alredy exist with the email,Please use other mail"})
        }else{
            await userModel.updateOne({_id:id},{$set:{email:newMail,name:newName}})
            res.status(200).json({message:'Profile edited successfully'})
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({errMsg:"Server Error"})
    }
}

module.exports = {
    register,
    login,
    editProfile
}
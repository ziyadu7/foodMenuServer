const sha256 = require('js-sha256');
const userModel = require('../models/userModel');
const { generateToken } = require('../middlewares/auth');
const menuModel = require('../models/menuModel');
const categoryModel = require('../models/categoryModel');
require('dotenv').config()

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const admin = await userModel.findOne({ $and: [{ email }, { password: sha256(password + process.env.SALT) }] })
        if (!admin || admin?.isAdmin == false) {
            return res.status(403).json({ errMsg: "Acess Denied" })
        } else {
            const token = generateToken(admin._id, 'admin')
            res.status(200).json({ message: "Admin login success", token })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errMsg: "Server Error" })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find({ isAdmin: false })
        res.status(200).json({ users })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errMsg: "Server Error" })
    }
}

const addAdmin = async (req, res) => {
    try {
        const { id } = req.body
        const isUpdated = await userModel.updateOne({ _id:id }, { $set: { isAdmin: true } })
        if(isUpdated.modifiedCount!=0){
            return res.status(200).json({ message: "User role changed" })
        }else{
            return res.status(400).json({errMsg:"User role not changed or user not found"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errMsg: "Server Error" })
    }
}

const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body
        await categoryModel.create({ categoryName })
        res.status(200).json({ message: "Category added successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errMsg: "Server Error" })
    }
}

const addMenu = async (req, res) => {
    try {
        // HERE SUB CATEGORY WILL BE ARRAY OF STRINGS EX:-['Chicken', 'gravy',' curry']
        // CATEGORY IS LIKE EX:- Chinese, Arabian, Panjabi, Kerala

        const { foodName, categoryId, subCategory } = req.body
        await menuModel.create({
            foodName,
            categoryId,
            subCategory
        })
        res.status(200).json({ message: "Menu added successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errMsg: "Server Error" })
    }
}

const editMenu = async (req, res) => {

    try {
        const { menuId, foodName, categoryId, subCategory } = req.body

        await menuModel.updateOne({ _id: menuId }, { $set: { foodName, categoryId, subCategory } })
        res.status(200).json({ message: 'Menu edited successfully' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errMsg: "Server Error" })
    }
}

module.exports = {
    adminLogin,
    addAdmin,
    addCategory,
    addMenu,
    editMenu,
    getUsers
}
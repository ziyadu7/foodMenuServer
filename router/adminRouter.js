const express = require('express')
const validation = require('../middlewares/validation')
const adminController = require('../controllers/adminController')
const auth = require('../middlewares/auth')
const router = express.Router()

router.post('/login',validation.loginValidation,adminController.adminLogin) 
router.get('/getUsers',auth.verifyAdminToken,adminController.getUsers) 
router.post('/addAdmin',auth.verifyAdminToken,adminController.addAdmin) 
router.post('/addCategory',auth.verifyAdminToken,validation.addCategoryValidation,adminController.addCategory)
router.post('/addMenu',auth.verifyAdminToken,validation.addMenuValidation,adminController.addMenu)
router.post('/editMenu',auth.verifyAdminToken,validation.editMenuValidation,adminController.editMenu)

module.exports = router
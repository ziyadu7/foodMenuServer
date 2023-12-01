const express = require('express')
const validation = require('../middlewares/validation')
const adminController = require('../controllers/adminController')
const auth = require('../middlewares/auth')
const router = express.Router()

router.post('/login',validation.userValidation,adminController.adminLogin) 
router.post('/addAdmin',auth.verifyAdminToken,adminController.addAdmin) 
router.post('/addCategory',auth.verifyAdminToken,adminController.addCategory)


module.exports = router
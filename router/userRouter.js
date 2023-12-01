const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const validation = require('../middlewares/validation')
const userController = require('../controllers/userController')

router.get('/',auth.verifyUserToken,userController.getMenu)
router.post('/register',validation.userValidation,userController.register)
router.post('/login',validation.loginValidation,userController.login)
router.post('/editProfile',auth.verifyUserToken,validation.editProfileValidation,userController.editProfile)

module.exports = router
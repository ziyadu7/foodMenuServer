const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const validation = require('../middlewares/validation')
const userController = require('../controllers/userController')

router.post('/register',validation.userValidation,userController.register)
router.post('/login',validation.userValidation,userController.login)
router.post('/editProfile',auth.verifyUserToken,userController.editProfile)

module.exports = router
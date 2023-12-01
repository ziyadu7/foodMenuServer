const { userValidationSchema,editProfileValidationSchema,addCategoryValidationSchema,addMenuValidationSchema,editMenuValidationSchema } = require('../helpers/validationSchema')

module.exports = {
    userValidation: async (req, res, next) => {
        try {
            await userValidationSchema.validateAsync(req.body)
            next()
        } catch (error) {
            if (error.isJoi == true) {
                error.status = 422
                res.status(422).json({ errMsg: error.message })
            }
            console.log(error.message);
        }
    },
    editProfileValidation: async (req, res, next) => {
        try {
            await editProfileValidationSchema.validateAsync(req.body)
            next()
        } catch (error) {
            if (error.isJoi == true) {
                error.status = 422
                res.status(422).json({ errMsg: error.message })
            }
            console.log(error.message);
        }
    },

    addCategoryValidation:async (req,res,next)=>{
        try {
            await addCategoryValidationSchema.validateAsync(req.body)
            next()
        } catch (error) {
            if (error.isJoi == true) {
                error.status = 422
                res.status(422).json({ errMsg: error.message })
            }
            console.log(error.message);
        }
    },

    addMenuValidation:async(req,res,next)=>{
        try {
            await addMenuValidationSchema.validateAsync(req.body)
            next()
        } catch (error) {
            if (error.isJoi == true) {
                error.status = 422
                res.status(422).json({ errMsg: error.message })
            }
            console.log(error.message);
        }
    },

    editMenuValidation:async(req,res,next)=>{
        try {
            await editMenuValidationSchema.validateAsync(req.body)
            next()
        } catch (error) {
            if (error.isJoi == true) {
                error.status = 422
                res.status(422).json({ errMsg: error.message })
            }
            console.log(error.message);
        }
    }
}
const {userValidationSchema} = require('../helpers/validationSchema')

module.exports = {
    userValidation:async (req,res,next)=>{
        try {
            await userValidationSchema.validateAsync(req.body)
            next()     
        } catch (error) {
            if(error.isJoi==true){
                error.status = 422
                res.status(422).json({errMsg:error.message})
            }
            console.log(error.message);
        }
    }
}
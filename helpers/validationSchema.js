const Joi = require('joi')

const userValidationSchema = Joi.object({
    name:Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password:Joi.string().min(4).required()
})

module.exports = {
    userValidationSchema
}
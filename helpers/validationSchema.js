const Joi = require('joi')

const userValidationSchema = Joi.object({
    name:Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password:Joi.string().min(4).required()
})

const editProfileValidationSchema = Joi.object({
    newName:Joi.string().required(),
    newMail: Joi.string().email().lowercase().required(),
})

module.exports = {
    userValidationSchema,
    editProfileValidationSchema
}
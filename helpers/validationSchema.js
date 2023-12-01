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

const addCategoryValidationSchema = Joi.object({
    categoryName:Joi.string().required()
})

const addMenuValidationSchema = Joi.object({
    foodName:Joi.string().required(),
    categoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    subCategory: Joi.array().items(Joi.string()).required(),
})

const editMenuValidationSchema = Joi.object({
    menuId : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    foodName:Joi.string().required(),
    categoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    subCategory: Joi.array().items(Joi.string()).required(),
})
module.exports = {
    userValidationSchema,
    editProfileValidationSchema,
    addCategoryValidationSchema,
    addMenuValidationSchema,
    editMenuValidationSchema
}
import Joi from "joi"

const validateParams = Joi.object({
    id: Joi.number().required()
}).required()
const validateQueries = Joi.object({
    categoryId: Joi.number().integer(),
    subCategoryId: Joi.number().integer(),
    model: Joi.string()
}).required()
const validateLogin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required().min(5)
}).required()
const validateCategory = Joi.object({
    categoryName: Joi.string().required()
})
const validateSubCategory = Joi.object({
    categoryId: Joi.number().required(),
    subCategoryName: Joi.string().required()
})
const validateProduct = Joi.object({
    subCategoryId: Joi.number().required(),
    model: Joi.string().required(),
    productName: Joi.string().required(),
    color: Joi.string().required(),
    price: Joi.string().required()
})
export {
    validateParams,
    validateQueries,
    validateLogin,
    validateCategory,
    validateSubCategory,
    validateProduct
}
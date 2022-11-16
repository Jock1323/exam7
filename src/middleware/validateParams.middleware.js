import { customError } from "../errors/customError.js"
import { validateLogin, validateParams,validateQueries,validateCategory, validateSubCategory, validateProduct } from "../validation/validate.js"

const validateParamsMiddleware=(req,_,next)=>{
    const {error,value}=validateParams.validate(req.params)
    if(error) next(new customError(400,error.message.replaceAll("\"","")))
    req.filteredParams=value
    next()
}
const validateQueriesMiddleware=(req,_,next)=>{
    const {error,value}=validateQueries.validate(req.query)
    if(error) next(new customError(400,error.message.replaceAll("\"","")))
    req.filteredQuery=value
    next()
}
const validateLoginMiddleware=(req,_,next)=>{
    const {error,value}=validateLogin.validate(req.body)
    if(error) next(new customError(400,error.message.replaceAll("\"","")))
    req.filteredBody=value
    next()
}
const validateCategoriesMiddleware=(req,_,next)=>{
    const {error,value}=validateCategory.validate(req.body)
    if(error) next(new customError(400,error.message.replaceAll("\"","")))
    req.filteredBody=value
    next()
}
const validateSubCategoriesMiddleware=(req,_,next)=>{
    const {error,value}=validateSubCategory.validate(req.body)
    if(error) next(new customError(400,error.message.replaceAll("\"","")))
    req.filteredBody=value
    next()
}
const validateProductsMiddleware=(req,_,next)=>{
    const {error,value}=validateProduct.validate(req.body)
    if(error) next(new customError(400,error.message.replaceAll("\"","")))
    req.filteredBody=value
    next()
}
export{
    validateParamsMiddleware,
    validateQueriesMiddleware,
    validateLoginMiddleware,
    validateCategoriesMiddleware,
    validateSubCategoriesMiddleware,
    validateProductsMiddleware
}
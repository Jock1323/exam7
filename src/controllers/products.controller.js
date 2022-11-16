import { customError } from "../errors/customError.js"
import {read,write} from "../utils/fs.js"
import {verify} from "../utils/jwt.js"
const getProducts=(req,res,next)=>{
    const {categoryId,model,subCategoryId}=req.filteredQuery
 try {
    if(categoryId){
        const allCategories=read("categories.json")
        const allSubcategories=read("subcategories.json")
        const allProducts=read("products.json")
        const foundedSubcategories=allSubcategories.filter(subcategory=>subcategory.categoryId==categoryId)
        const foundedProducts=[]
        for(let subcategory of foundedSubcategories){
            foundedProducts.push(...allProducts.filter(product=>product.subCategoryId==subcategory.subCategoryId).filter(product=>delete product.subCategoryId))
        }
        const foundedCategoryName=allCategories.find(category=>category.categoryId==categoryId)?.categoryName
        if(foundedCategoryName){
            res.status(200).json({
                message:`founded ${foundedCategoryName}`,
                data:foundedProducts
            })
        }
        else{
            res.status(404).json({
                message:"not found",
                data:[]
            })
        }
    }
    else if(subCategoryId && model){
        const foundedProducts=read("products.json").filter(product=>product.subCategoryId==subCategoryId && product.model.toLowerCase().includes(model.toLowerCase())).filter(product=>delete product.subCategoryId)
        if(foundedProducts.length<=0){
            res.status(404).json({
                message:"not found",
                data:[]
            })
        }
      else{
        res.status(200).json({
            message:"founded products",
            data:foundedProducts
        })
      }
    }
    else if(model){
        const foundedProducts=read("products.json").filter(product=>product.model.toLowerCase().includes(model.toLowerCase())).filter(product=>delete product.subCategoryId)
        if(foundedProducts.length<=0){
            res.status(404).json({
                message:"not found",
                data:[]
            })
        }
      else{
        res.status(200).json({
            message:"founded products",
            data:foundedProducts
        })
      }
    }
    else if(subCategoryId){
        const foundedProducts=read("products.json").filter(product=>product.subCategoryId==subCategoryId).filter(product=>delete product.subCategoryId)
        if(foundedProducts.length<=0){
            res.status(404).json({
                message:"not found",
                data:[]
            })
        }
      else{
        res.status(200).json({
            message:"founded products",
            data:foundedProducts
        })
      }
        
    }
    else{
        res.status(404).json({
            message:"not found",
            data:[]
        })
    }
 } catch (error) {
    next(new customError(400,error.message))
 }
}
const getProductsById=(req,res,next)=>{
try {
    const {id}=req.filteredParams
    const foundedProduct=read("products.json").find(product=>product.productId==id)
    delete foundedProduct?.subCategoryId
    if(!foundedProduct){
        res.status(404).json({
            message:"not found",
            data:{}
        })
    }
    else{
        res.status(200).json({
            message:"founded product",
            data:foundedProduct
        })
    }
} catch (error) {
    next(new customError(400,error.message))
}
}
const postProduct=async(req,res,next)=>{
    try {
     const {token}=req.headers
     const id=await verify(token).catch(err=>next(new customError(400,err.message)))
     if(id){
        // { "productId": 7, "subCategoryId": 1, "model": "nokia", "productName": "1202 ", "color": "red", "price": "20" }
         const {productId,subCategoryId,model,productName,color,price}=req.filteredBody
     const allProducts=read("products.json")
     allProducts.push({
        productId:allProducts.at(-1)?.productId+1 || 1,
        subCategoryId,
        model,
        productName,
        color,
        price
     })
     write("products.json",allProducts)
     res.status(201).json({
         message:"product added"
     })
     }
    } catch (error) {
     next(new customError(500,error.message))
    }
 }
 const putProduct=async(req,res,next)=>{
    try {
     const {token}=req.headers
     const {id}=req.filteredParams
     const userId=await verify(token).catch(err=>next(new customError(400,err.message)))
     if(userId){
         const {subCategoryId,model,productName,color,price}=req.filteredBody
     const allProducts=read("products.json")
         const foundedProduct=allProducts.find(product=>product.productId==id)
         foundedProduct.subCategoryId=subCategoryId || foundedProduct.subCategoryId
         foundedProduct.model=model || foundedProduct.model,
         foundedProduct.productName=productName || foundedProduct.productName
         foundedProduct.color=color || foundedProduct.color
         foundedProduct.price=price || foundedProduct.price
     write("products.json",allProducts)
     res.status(201).json({
         message:"product updated"
     })
     }
    } catch (error) {
     next(new customError(500,error.message))
    }
 }
 const deleteProduct=async(req,res,next)=>{
    try {
     const {token}=req.headers
     const {id}=req.filteredParams
     const userId=await verify(token).catch(err=>next(new customError(400,err.message)))
     if(userId){
     const allProducts=read("products.json")
     const notFilteredProducts=allProducts.filter(product=>product.productId!=id)
     write("products.json",notFilteredProducts)
     res.status(201).json({
         message:"product deleted"
     })
     }
    } catch (error) {
     next(new customError(500,error.message))
    }
 }
export{
    getProducts,
    getProductsById,
    postProduct,
    putProduct,
    deleteProduct
}
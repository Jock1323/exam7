import {customError} from "../errors/customError.js"
import { read,write } from "../utils/fs.js"
import { verify } from "../utils/jwt.js"
const getSubCategories=(_,res,next)=>{
    try {
        const allSubCategories=read("subCategories.json")
        const allProducts=read("products.json")
        for(let subcategory of allSubCategories){
            subcategory.products=allProducts.filter(product=>product.subCategoryId==subcategory.subCategoryId).filter(product=>delete product.subCategoryId)
            delete subcategory.categoryId
        }
        res.send(allSubCategories)
    } catch (error) {
        next(new customError(500,error.message))
    }
}
const getSubCategoriesById=(req,res,next)=>{
    try {
        const {id}=req.filteredParams
        const allSubCategories=read("subCategories.json")
        const allProducts=read("products.json")
        const foundedSubCategory=allSubCategories.find(subcategory=>subcategory.subCategoryId==id)
        if(!foundedSubCategory) throw new Error("subcategory not  found")
        const products=allProducts.filter(product=>product.subCategoryId==id).filter(product=>delete product.subCategoryId)
        foundedSubCategory.products=products
        delete foundedSubCategory.categoryId
        res.status(200).json({
            message:"founded subcategory",
            data:foundedSubCategory
        })
    } catch (error) {
        next(new customError(404,error.message))
    }
}
const postSubCategory=async(req,res,next)=>{
   try {
    const {token}=req.headers
    const id=await verify(token).catch(err=>next(new customError(400,err.message)))
    if(id){
        const {categoryId,subCategoryName}=req.filteredBody
    const allSubCategories=read("subCategories.json")
    allSubCategories.push({
        subCategoryId:allSubCategories.at(-1)?.subCategoryId+1 || 1,
        categoryId,
        subCategoryName
    })
    write("subCategories.json",allSubCategories)
    res.status(201).json({
        message:"subcategory added"
    })
    }
   } catch (error) {
    next(new customError(500,error.message))
   }
}
const putSubCategory=async(req,res,next)=>{
   try {
    const {token}=req.headers
    const {id}=req.filteredParams
    const userId=await verify(token).catch(err=>next(new customError(400,err.message)))
    if(userId){
        const {subCategoryName,categoryId}=req.filteredBody
    const allSubCategories=read("subCategories.json")
        const foundedSubCategory=allSubCategories.find(subcategory=>subcategory.subCategoryId==id)
        if(foundedSubCategory){
            foundedSubCategory.categoryId=categoryId || foundedSubCategory.categoryId
            foundedSubCategory.subCategoryName=subCategoryName || foundedSubCategory.subCategoryName
        write("subCategories.json",allSubCategories)
        res.status(201).json({
            message:"subcategory updated"
        })
        }
        else{
            res.status(400).json({
                message:"subcategory not found"
            })
        }
    }
   } catch (error) {
    next(new customError(500,error.message))
   }
}
const deleteSubCategory=async(req,res,next)=>{
   try {
    const {token}=req.headers
    const {id}=req.filteredParams
    const userId=await verify(token).catch(err=>next(new customError(400,err.message)))
    if(userId){
    const allSubCategories=read("subCategories.json")
    const notFilteredSubCategories=allSubCategories.filter(subcategory=>subcategory.subCategoryId!=id)
    write("subCategories.json",notFilteredSubCategories)
    res.status(201).json({
        message:"subcategory deleted"
    })
    }
   } catch (error) {
    next(new customError(500,error.message))
   }
}
export{
    getSubCategories,
    getSubCategoriesById,
    postSubCategory,
    putSubCategory,
    deleteSubCategory
}
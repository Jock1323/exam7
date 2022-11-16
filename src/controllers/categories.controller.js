import {customError} from "../errors/customError.js"
import { read, write } from "../utils/fs.js"
import { verify } from "../utils/jwt.js"
const getCategories=(_,res,next)=>{
    try {
        const allCategories=read("categories.json")
        const allSubCategories=read("subCategories.json")
        for(let category of allCategories){
            category.subCategories=allSubCategories.filter(subcategory=>subcategory.categoryId==category.categoryId).filter(subcategory=>delete subcategory.categoryId)
        }
        res.send(allCategories)
    } catch (error) {
        next(new customError(500,error.message))
    }
}
const getCategoriesById=(req,res,next)=>{
    try {
        const {id}=req.filteredParams
        const allCategories=read("categories.json")
        const foundedCategory=allCategories.find(category=>category.categoryId==id)
        if(!foundedCategory) throw new Error("category not  found")
        const subCategories=read("subCategories.json").filter(subcategory=>subcategory.categoryId==id).filter(subcategory=>delete subcategory.categoryId)
        foundedCategory.subCategories=subCategories
        res.status(200).json({
            message:"founded category",
            data:foundedCategory
        })
    } catch (error) {
        next(new customError(404,error.message))
    }
}
const postCategory=async(req,res,next)=>{
   try {
    const {token}=req.headers
    const id=await verify(token).catch(err=>next(new customError(400,err.message)))
    if(id){
        const {categoryName}=req.filteredBody
    const allCategories=read("categories.json")
    allCategories.push({
        categoryId:allCategories.at(-1)?.categoryId+1 || 1,
        categoryName
    })
    write("categories.json",allCategories)
    res.status(201).json({
        message:"category added"
    })
    }
   } catch (error) {
    next(new customError(500,error.message))
   }
}
const putCategory=async(req,res,next)=>{
   try {
    const {token}=req.headers
    const {id}=req.filteredParams
    const userId=await verify(token).catch(err=>next(new customError(400,err.message)))
    if(userId){
        const {categoryName}=req.filteredBody
    const allCategories=read("categories.json")
        const foundedCategory=allCategories.find(category=>category.categoryId==id)
        if(foundedCategory){
            foundedCategory.categoryName=categoryName || foundedCategory.categoryName
            write("categories.json",allCategories)
            res.status(201).json({
                message:"category updated"
            })
        }
        else{
            res.status(400).json({
                message:"category not found"
            })
        }
    }
   } catch (error) {
    next(new customError(500,error.message))
   }
}
const deleteCategory=async(req,res,next)=>{
   try {
    const {token}=req.headers
    const {id}=req.filteredParams
    const userId=await verify(token).catch(err=>next(new customError(400,err.message)))
    if(userId){
    const allCategories=read("categories.json")
    const notFilteredCategories=allCategories.filter(category=>category.categoryId!=id)
    write("categories.json",notFilteredCategories)
    res.status(201).json({
        message:"category deleted"
    })
    }
   } catch (error) {
    next(new customError(500,error.message))
   }
}
export{
    getCategories,
    getCategoriesById,
    postCategory,
    putCategory,
    deleteCategory
}
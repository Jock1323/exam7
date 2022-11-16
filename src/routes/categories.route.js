import { Router } from "express";
import { deleteCategory, getCategories, getCategoriesById, postCategory,putCategory } from "../controllers/categories.controller.js";
import { validateParamsMiddleware,validateCategoriesMiddleware } from "../middleware/validateParams.middleware.js";
const router=Router()
router.get("/categories",getCategories)
router.get("/categories/:id",validateParamsMiddleware,getCategoriesById)
router.post("/categories/post",validateCategoriesMiddleware,postCategory)
router.put("/categories/put/:id",validateParamsMiddleware,validateCategoriesMiddleware,putCategory)
router.delete("/categories/delete/:id",validateParamsMiddleware,deleteCategory)

export default router
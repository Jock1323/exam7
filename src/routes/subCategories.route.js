import { Router } from "express";
import { getSubCategories,getSubCategoriesById, postSubCategory, putSubCategory,deleteSubCategory } from "../controllers/subcategories.controller.js";
import { validateParamsMiddleware, validateSubCategoriesMiddleware } from "../middleware/validateParams.middleware.js";
const router=Router()
router.get("/subcategories",getSubCategories)
router.get("/subcategories/:id",validateParamsMiddleware,getSubCategoriesById)
router.post("/subcategories/post",validateSubCategoriesMiddleware,postSubCategory)
router.put("/subcategories/put/:id",validateParamsMiddleware,validateSubCategoriesMiddleware,putSubCategory)
router.delete("/subcategories/delete/:id",validateParamsMiddleware,deleteSubCategory)

export default router
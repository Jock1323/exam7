import { Router } from "express";
import { getProducts,getProductsById,postProduct,putProduct,deleteProduct} from "../controllers/products.controller.js";
import { validateQueriesMiddleware,validateParamsMiddleware, validateProductsMiddleware } from "../middleware/validateParams.middleware.js";
const router=Router()
router.get("/products",validateQueriesMiddleware,getProducts)
router.get("/products/:id",validateParamsMiddleware,getProductsById)
router.post("/products/post",validateProductsMiddleware,postProduct)
router.put("/products/put/:id",validateParamsMiddleware,validateProductsMiddleware,putProduct)
router.delete("/products/delete/:id",validateParamsMiddleware,deleteProduct)

export default router
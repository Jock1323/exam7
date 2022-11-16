import { Router } from "express";
import { login } from "../controllers/users.controller.js";
import {validateLoginMiddleware } from "../middleware/validateParams.middleware.js";
const router=Router()
router.post("/login",validateLoginMiddleware,login)
export default router
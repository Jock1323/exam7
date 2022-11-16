import express from "express"
import { customError } from "./errors/customError.js"
import { errorHandlerMiddleware } from "./middleware/errorHandler.middleware.js"
import categoriesRoute from "./routes/categories.route.js"
import subcategoriesRoute from "./routes/subCategories.route.js"
import loginRoute from "./routes/users.route.js"
import products from "./routes/products.route.js"
const PORT=process.env.PORT || 8080
const app=express()
app.use(express.json())
app.use(categoriesRoute)
app.use(subcategoriesRoute)
app.use(products)
app.use(loginRoute)
app.all("/*",(_,__,next)=>next(new customError(404,"Page not found")))
app.use(errorHandlerMiddleware)
app.listen(PORT,console.log("hello from the server"))

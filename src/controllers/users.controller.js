import dotenv from "dotenv"
import sha256 from "sha256"
import {customError} from "../errors/customError.js"
import { read} from "../utils/fs.js"
import {sign} from "../utils/jwt.js"
dotenv.config()

const login=(req,res,next)=>{
   try {
    const allUsers=read("users.json")
    const {username,password}=req.filteredBody
    const foundedUser=allUsers.find(user=>user.username==username && user.password==sha256(password))
    if(!foundedUser){
        next(new customError(400,"username or password wrong"))
    }
    else{
        res.status(201).json({
            message:"welcome",
            token:sign(foundedUser.id)
        })
    }
   } catch (error) {
        next(new customError(500,error.message))
   }
}
export{
    login
}
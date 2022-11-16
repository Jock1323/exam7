const errorHandlerMiddleware=(err,_,res,__)=>{
    res.status(err.status).json({
        status:err.status,
        message:err.message,
    })
}
export{
    errorHandlerMiddleware
}
const CustomError = require("../../Helpers/error/CustomError")

const customErrorHandler = (err,req,res,next)=> {
   
    if (err.code == 11000) {
        err = new CustomError("Duplicate Field Value Enter " , 400)
    }

    if (err.name === 'SyntaxError') {
        err = new CustomError('Unexpected Syntax ', 400)
    }
    
    if (err.name === 'ValidationError') {
        err = new CustomError(err.message, 400)
    }

    if (err.name === "CastError") {
        err = new CustomError("Please provide a valid id  ", 400)
    }
    
    if (err.name === "TokenExpiredError") {
        err = new CustomError("JWT expired  ", 401)
    }
    
    if (err.name === "JsonWebTokenError") {
        err = new CustomError("JWT malformed  ", 401)
    }

    // Log error details for debugging
    console.log("Custom Error Handler => ", {
        name: err.name,
        message: err.message,
        statusCode: err.statusCode,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
    })
  
    return res.status(err.statusCode||500)
    .json({
        success: false,
        error: err.message || "Server Error",
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    })

}


module.exports = customErrorHandler

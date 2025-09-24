const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")

const IndexRoute = require("./Routers/index")
const connectDatabase = require("./Helpers/database/connectDatabase")
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler")

dotenv.config()

// Check for required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    console.error('Please set these environment variables in your Render deployment settings');
    process.exit(1);
}

connectDatabase()

const app = express() ;

app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname , "public") ))

app.use("/",IndexRoute)

app.use(customErrorHandler)

const PORT = process.env.PORT || 5000 ;

const server = app.listen(PORT,()=>{

    console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`)

})

process.on("unhandledRejection",(err , promise) =>{
    console.log(`Logged Error : ${err}`)

    server.close(()=>process.exit(1))
})
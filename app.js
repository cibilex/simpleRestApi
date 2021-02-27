const path=require("path")
require("dotenv").config({
    path:path.join(__dirname,"helpers/.env")
})
const PORT=process.env.AP_PORT || 8000;
const mode=process.env.AP_MODE || production;
const express=require("express")
const app=express()

app.get("/hey",(req,res)=>res.send("nabersadas"))

//connected to mongodb
require("./helpers/connectMongodb")()
.then(()=>console.log("connected to mongodb"))
.catch(err=>console.log(err))

//catch to data of the server
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(require("cookie-parser")())
 const usermodel=require("./models/userModel")

//routers
app.use(require("./routers/mainRouter"))

//error Handler
app.use(require("./middlewares/errorHandler"))
app.listen(PORT,()=>{
    console.log(`server working to ${mode} mode in ${PORT} port`)
})
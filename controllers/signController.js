const asynErrHandler = require("express-async-handler");
const MyError = require("../helpers/MyError");
const userModel=require("../models/userModel");
const bcrypt=require("bcrypt");
const {bcryptCompare,generateToken}=require("../helpers/serverOperations")
module.exports.signPage=asynErrHandler(async(req,res,next)=>{
    let {email,password}=req.body
    let user=await userModel.findOne({email}).select("+password")
    if(!user) throw new MyError("ValidationError","pls enter valid an email",401)
    if(!(await bcryptCompare(password,user.password))) throw new MyError("ValidationError","The password you entered does not match the email address.",401)
    console.log(user.username+"giriş yaptı")
    let peyload={
        username:user.id
    }
    let token=generateToken(peyload)
    res.cookie("token",`Bearer: ${token}`,{
        maxAge:10*36000,
        secure:process.env.AP_MODE ? false : true,
        httpOnly:true
    })
    res.json({
        success:true,
        message:token
    })
})

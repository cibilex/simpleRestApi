const asynErrHandler = require("express-async-handler");
const MyError = require("../helpers/MyError");
const userModel=require("../models/userModel")
const {generateToken,jwtCookieControl}=require("../helpers/serverOperations");
const { findOne } = require("../models/userModel");
module.exports.getresetPassword=asynErrHandler(async(req,res,next)=>{
    var user=await userModel.findOne({
       resetPassword:req.query.token
    })
    if(!user)throw new MyError("timeError","u cant enter to here",401)
  var user=await userModel.findOne({
    resetPassword:{$gt:Date.now()}
     })
     if(!user){
         user.resetPassword=[]
         await user.save()
        throw new MyError("timeError","password reset operation is expired",400)
     }
     let token=await generateToken({
         id:user.id
     })
     res.cookie("token",`Bearer: ${token}`,{
        maxAge:10*36000,
        secure:process.env.AP_MODE ? false : true,
        httpOnly:true
    })
    res.json({
        success:true,
        message:"u can reset password",
        token
    })
})

module.exports.postResetPassword=asynErrHandler(async(req,res,next)=>{
    console.log(req.user.id)
    let user=await userModel.findById(req.user.id)
    if(!user) throw new MyError("authError","geçersiz id",401)
    user.password="mehmet1234asdmöasmdasödmasçödmasçödmasçödmasçödasmdçö5" 
    user.resetPassword=[]
    await user.save()
    console.log(user)
    res.json({
        success:true,
        message:`${user.username}'s password changed`
    })
})
const asynErrHandler = require("express-async-handler");
const MyError = require("../helpers/MyError");
const {jwtCookieControl,jwtVerify,getJwtCookie}=require("../helpers/serverOperations")

module.exports.authorization=asynErrHandler(async(req,res,next)=>{
    let tokenControl=await jwtCookieControl(req)
    if(!tokenControl) throw new MyError("AutError","you cant enter to here",401)
    let token=await getJwtCookie(req)
    let decoded=await jwtVerify(token)
    console.log("yetkilendirme yapıldı")
    req.user={
        id:decoded.id
    }
    next()
})
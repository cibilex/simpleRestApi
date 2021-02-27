const { request } = require("express");

const multer=require("multer")
const MyError=require("../helpers/MyError")
const path=require("path")



const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        let imgField=path.join(path.dirname(require.main.filename),"profileImages")
        cb(null,imgField)
    },
    filename:(req,file,cb)=>{
        let [img,ext]=file.mimetype.split("/")
        req.userImage=img+req.user.username+"."+ext
        cb(null,req.userImage)
    }
})
const fileFilter=(req,file,cb)=>{

    let currentMimeTypes=["image/apng","image/png","image/svg+xml","image/jpeg"]
    if(!(currentMimeTypes.includes(file.mimetype))) return cb(new MyError("multerError",`${file.mimetype} not valid.pls load as to valid type of the image`,400))
    cb(null,true)
}
module.exports=multer({storage,fileFilter,limits:{
    fileSize:500*8*1024   //500 kilobayt    
}})
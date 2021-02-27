const router=require("express").Router();
const {forgotPassword}=require("../controllers/forgotPassword")
const {getresetPassword}=require("../controllers/resetPassword")
router.post("/",forgotPassword)

module.exports=router;
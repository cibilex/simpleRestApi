const router=require("express").Router();
const {getresetPassword,postResetPassword}=require("../controllers/resetPassword");
const {authorization}=require("../middlewares/authorization")

router.get("/",getresetPassword)
router.post("/reflesh",authorization,postResetPassword)

module.exports=router;
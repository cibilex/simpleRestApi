const router=require("express").Router();
const {postRegister}=require("../controllers/registerController")


router.post("/",postRegister)

module.exports=router;
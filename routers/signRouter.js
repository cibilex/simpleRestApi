const router=require("express").Router();
const {signPage}=require("../controllers/signController")


router.post("/",signPage)

module.exports=router;
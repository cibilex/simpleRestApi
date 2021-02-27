const router=require("express").Router();
const {cathFile}=require("../controllers/cathFile")
const {authorization}=require("../middlewares/authorization")
const cathUserImage=require("../middlewares/cathFile")
router.put("/",[authorization,cathUserImage.single("userImage")],cathFile)
module.exports=router;
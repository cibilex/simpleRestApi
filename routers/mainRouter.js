const router=require("express").Router();


router.use("/sign",require("./signRouter"))
router.use("/register",require("./registerRouter"))
router.use("/file",require("./cathFileRouter"))
router.use("/forgot",require("./forgotpasswordRouter"))
router.use("/reset",require("./resetPassword"))
module.exports=router;
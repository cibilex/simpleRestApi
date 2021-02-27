const asynErrHandler = require("express-async-handler");
const MyError = require("../helpers/MyError");
const userModel=require("../models/userModel")
module.exports.postRegister = asynErrHandler(async (req, res, next) => {
    const {username,password,email,admin}=req.body

    const user=await userModel.create({
        username,
        password,
        email,
        admin
    })
  res.json({
    success: true,
    message: "customer registered",
    data:user
  });
});

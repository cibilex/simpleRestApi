const asynErrHandler = require("express-async-handler");
const MyError = require("../helpers/MyError");
const userModel = require("../models/userModel");
module.exports.cathFile = asynErrHandler(async (req, res, next) => {
  let user = await userModel.findOneAndUpdate(
    req.user,
    {
      userImage: req.userImage,
    },
    {
      new: true,
      runValidators: false,
    }
  );
  console.log(user.username+" "+"resmi güncellendi")
  res.json({
    success: true,
    message: "file loaded",
  });
});

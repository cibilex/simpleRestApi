const asynErrHandler = require("express-async-handler");
const MyError = require("../helpers/MyError");
const userModel = require("../models/userModel");
const path = require("path");
const { sendEmail } = require("../helpers/sendEmail");
const { createHash } = require("../helpers/serverOperations");

module.exports.forgotPassword = asynErrHandler(async (req, res, next) => {
  let token=await createHash()
  let user = await userModel.findOneAndUpdate(
    { email: req.body.email },
    {
      resetPassword: [token,Date.now()+1000*3600],
    },
    {
      new: true,
    }
  );
  if (!user) throw new MyError("validationError", "pls enter a valid email");
  let peyload = {
    from:req.body.email,
    to: req.body.email,
    subject: "dont worry",
    html: `
        <h1 style="color:red;" style="width:100%;text-align:center;text-transform:uppercase;">for Email reset</h1></br>
        <div style="width:100%;display:flex,justify-content:center;"><img  style="border-radius:100%;width:280px;" src="cid:resmımı@hs"></div> </br>
        <p>click <strong><a href="http://localhost:5000/reset?token=${token}">here</a></strong> for reset Email</p></br>
        `,
    attachments: {
      filename: "man.jpg",
      path: path.join(
        path.dirname(require.main.filename),
        "profileImages/Twitter.jpg"
      ),
      cid: "resmımı@hs",
    },
  };
  try {
    var info = await sendEmail(peyload);
  } catch (e) {
    user.resetPassword = [];
    await user.save();
    throw new MyError(e.name, e.message, 500);
  }
  console.log("mail gönderildi");
  console.log(info.response);
  res.json({
    success: true,
    message: "send to email",
  });
});


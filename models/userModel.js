const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MyError = require("../helpers/MyError");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "pls enter an username"],
    maxlength: [20, "username should be lesser than twenty"],
    minlength: [2, "username should be greater than two"],
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: [true, "pls enter an password"],
    maxlength: [20, "pasword should be lesser than twenty"],
    minlength: [2, "pasword should be greater than two"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "pls enter an email"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "pls fill a valid email address",
    ],
    unique: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  userImage:{
    type:String,
    default:"userImage.jpg"
  },
  resetPassword:[]
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      console.log("password hash done");
      this.password = hash;
      next();
    });
  });
});
userSchema.post("save", function (doc) {
  console.log(`${this.username} insert to database`);
});
module.exports = mongoose.model("userSchema", userSchema, "customerss");

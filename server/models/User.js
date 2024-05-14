import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { timeStamp } from "console";

console.log(process.env.PORT);

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please Enter Your First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please Enter Your Last Name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    mobile: {
      type: Number,
    },
    password: {
      type: String,
      minLength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    googleId: {
      type: String,
      required: true,
    },
    avatar: {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    currentToken: {
      type: String,
      defaultValue: null,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
      lowercase: true,
    },

    resetPasswordToken: String,
    resetPasswordExpire: String,
  },
  {
    timeStamp: true,
  }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

schema.methods.getJwtToken = function () {
  const user = {
    ...this.toObject(),
  };
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

schema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

schema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

export const User = mongoose.model("User", schema);

import express from "express";
import {
  forgetPassword,
  login,
  logout,
  register,
  resetPassword,
} from "../Controller/usercontroller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

//ForgetPassword
router.route("/forgetpassword").post(forgetPassword);

//ResetPassword
router.route("/resetpassword/:token").put(resetPassword);
//Logout
router.route("/logout").get(logout);

export default router;

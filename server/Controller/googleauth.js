import express from "express";
import passport from "passport";
import GoogleAuth from "passport-google-oauth20";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

const callbackURL = "/api/v1/auth/google/callback";
const scope = ["profile", "email"];
const GoogleStrategy = GoogleAuth.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        if (!profile || !profile._json) {
          return done(
            new ErrorHandler("Email not provided by Google OAuth", 400)
          );
        }

        const email = profile._json.email;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            email,
            googleId: profile.id,
            avatar: {
              url: profile._json.picture,
            },
          });
        }

        if (user && !user.googleId) {
          return done(
            new ErrorHandler(
              "This account is registered with email and password. Please login with email and password.",
              400
            )
          );
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

const router = express.Router();

router.route("/googlelogin").get(
  passport.authenticate("google", {
    scope,
  })
);

const googleCallback = catchAsyncError(async (req, res, next) => {
  if (req.query.error) {
    return next(new ErrorHandler(req.query.error, 400));
  }
  let user = req.user;

  // if (!user) {
  //   return next(new ErrorHandler("User not found", 400));
  // }

  if (!user) {
    return res.redirect("/login");
  }

  user = await User.findOne({ email: user.email });
  const token = await user.getJwtToken();
  user.currentToken = token;
  user.save();
  return res.redirect(`${process.env.FRONTEND_URL}/auth?token=${token}`);
});

router.route("/google/callback").get(
  passport.authenticate("google", {
    session: false,
  }),
  googleCallback
);

export default router;

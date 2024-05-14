import { catchAsyncError } from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const requireAuthentication = catchAsyncError((req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new ErrorHandler("Unauthorized", 403));
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(new ErrorHandler("Not Loged In, Please Login Now", 403));
  }

  let decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decode.user;
  next();
});

export const requireAdminAuthentication = catchAsyncError((req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only Admin Allowed", 403));
  }
  next();
});

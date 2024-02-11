import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  // Check cookie
  if (!token) {
    return next(new Error("Not authorized, no token found"));
  }

  try {
    // Verify token -- this will have the user id in it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find user
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    const errorMessage = error.name === 'TokenExpiredError' ? "Token expired" : "Not authorized, invalid token";
    return next(new Error(errorMessage));
  }
});

export { protect };

// check/parse cookie and protect route
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  //   check cookie
  if (token) {
    try {
      //   verify token -- this will have the user id in it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //   find user
      // console.log(decoded);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }
});
export { protect };

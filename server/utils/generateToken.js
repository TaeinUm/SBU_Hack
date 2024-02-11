import jwt from "jsonwebtoken";


const generateToken = (res, userId) => {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in your environment variables');
    throw new Error('JWT_SECRET is required');
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  // Save token in cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/',
  });
};

export default generateToken;

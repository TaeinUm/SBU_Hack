import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { uploadSingleImage } from "../utils/s3upload.js"; // Import the upload utility

// @desc: Authenticate use and set token (Login User)
// route: POST /api/users/auth
// @access Public

// New function to upload image
export const uploadReceiptImage = async (req, res) => {
  const userId = req.user._id; // Ensure this is provided by your auth middleware
  const file = req; // Provided by multer-s3
  if (!file) {
    return res.status(400).json({ message: "No file uploaded!" });
  }

  try {
    await User.findByIdAndUpdate(userId, { receipt: file.location });
    res
      .status(200)
      .json({ message: "Image uploaded successfully", receipt: file.location });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to upload image", error: error.message });
  }
};

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    console.log(res, res.cookie);
    res
      .status(201)
      .json({ _id: user._id, username: user.username, email: user.email });
    console.log("User Authenticated");
  } else {
    res.status(401);
    throw new Error("Invalid user credentials");
  }
  // res.status(200).json({ message: "Auth User" });
});

// Password validation function
const validatePassword = (password) => {
  // Criteria:
  // - At least 8 characters long
  // - Contains at least one letter
  // - Contains at least one number
  // - Contains at least one special character
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return regex.test(password);
};

// @desc: Register a new user with credentials
// route: POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Password validation
  if (!validatePassword(password)) {
    res.status(400);
    throw new Error("Password does not meet the requirements.");
  }

  // Check if a user already exists
  const userExists = await User.findOne({ email });
  // If user exists, throw an error
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // Else save user in db
  const user = await User.create({ username, email, password });
  if (user) {
    generateToken(res, user._id);
    res
      .status(201)
      .json({ _id: user._id, username: user.username, email: user.email });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// @desc: Logout user and clear cookie
// route: POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out" });
});
// @desc: Get user Profile
// route: Get /api/users/profile[id]
// @access protected - need a vaild json webtoken
const getUser = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  };
  res.status(200).json(user);
});
// @desc: Update User Profile
// route: PUT /api/users/profile[id]
// @access protected - need a vaild json webtoken
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      // Password validation
      if (!validatePassword(req.body.password)) {
        res.status(400);
        throw new Error("Password does not meet the requirements.");
      }
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
    // const updatedUser
    console.log("Updated User Profile");
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// @desc: Delete User Profile
// route: Delete /api/users/profile[id]
// @access protected - need a vaild json webtoken
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    await User.findByIdAndDelete(userId);
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user profile" });
  }
});
export { authUser, registerUser, logoutUser, getUser, updateUser, deleteUser };

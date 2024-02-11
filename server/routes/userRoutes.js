import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
  uploadReceiptImage,
} from "../controllers/userController.js";

import {
  updateProductInfo,
  deleteProduct,
  getUserProducts,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import { uploadSingleImage } from "../utils/s3upload.js";

const router = express.Router();

// Authentication routes
router.post("/auth", authUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);

// User profile management
router
  .route("/profile")
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

// Image upload
router.post("/upload", protect, uploadSingleImage, uploadReceiptImage);

// Product management within a user document
router.route("/:userId/products").get(getUserProducts); // Get all products for a user

router
  .route("/:userId/products/:productId") // Update a specific product
  .delete(protect, deleteProduct); // Delete a specific product
router.route("/:userId/products").put(protect, updateProductInfo); // Update a specific product
// Delete a specific product

export default router;

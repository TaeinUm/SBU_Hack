import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { 
  updateProductInfo,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadReceiptImage } from "../controllers/userController.js";
import { uploadSingleImage } from "../utils/s3upload.js";

const router = express.Router();

router.post("/auth", authUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
// router.get("/profile", getUser);
// router.put("/profile", updateUser);
router
  .route("/profile")
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

router.post("/upload", protect, uploadSingleImage, uploadReceiptImage);

// Routes for managing products within a user document
router.put('/:userId/products/:productId', protect, updateProductInfo); // Update a specific product of a user
router.delete('/:userId/products/:productId', protect, deleteProduct); // Delete a specific product from a user


export default router;

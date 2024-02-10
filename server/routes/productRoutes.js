import express from 'express';
import { updateInfo } from '../controllers/productController.js';

const router = express.Router();

router.patch('/api/products/:id', updateInfo);

export default router;

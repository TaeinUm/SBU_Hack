import express from 'express';
import multer from 'multer';
import { uploadReceipt } from '../controllers/receiptController.js';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post('/', upload.single('img'), uploadReceipt);

export default router;

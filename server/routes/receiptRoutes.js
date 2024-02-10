const express = require('express');
const router = express.Router();
const receiptController = require('../controller/receiptController');

router.post('/receipts', receiptController.uploadReceipt);

module.exports = router;

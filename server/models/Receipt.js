const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
    img: String
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;

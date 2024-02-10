import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema({
    img: String
});

const Receipt = mongoose.model('Receipt', receiptSchema);

export default Receipt;

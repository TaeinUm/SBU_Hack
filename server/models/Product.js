import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    index: Number,
    productName: String,
    expdate: Date,
    donatable: Boolean
});

const Product = mongoose.model('Product', productSchema, 'products');

export default Product;

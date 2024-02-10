const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    expdate: Date,
    donatable: Boolean
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
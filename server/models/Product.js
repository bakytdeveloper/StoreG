
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    images: [String], // Теперь это массив строк для хранения путей к изображениям
    name: String,
    description: String,
    type: String,
    price: Number,
    specifications: {
        type: Map,
        of: String,
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

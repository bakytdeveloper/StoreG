
// server/controllers/products.js
const Product = require('./../models/Product');

exports.getAllProductTypes = async (req, res) => {
    try {
        const types = await Product.distinct('type');
        res.json(types);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    res.json(res.product);
};

exports.addProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        const newProduct = await product.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (err) {
        res.status(400).json({ message: 'Failed to add product', error: err.message });
    }
};

exports.updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        // Проверяем, существует ли продукт с заданным идентификатором
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Обновляем продукт с данными из тела PUT-запроса
        product.type = req.body.type;
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.images = req.body.images;
        product.specifications = req.body.specifications;

        // Сохраняем обновленный продукт
        const updatedProduct = await product.save();

        res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
        console.error('Error updating product:', err.message);
        res.status(400).json({ message: 'Failed to update product', error: err.message });
    }
};



exports.deleteProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        // Проверяем, существует ли продукт с заданным идентификатором
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Удаляем продукт
        await Product.deleteOne({ _id: productId });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err.message);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};


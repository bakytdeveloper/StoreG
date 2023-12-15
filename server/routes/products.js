

// server/routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('./../controllers/products');

// Получить все типы товаров
router.get('/products/types', productController.getAllProductTypes);

// Получить все товары
router.get('/products', productController.getAllProducts);

// Получить товар по ID
router.get('/products/:id', productController.getProductById);

// Добавить товар
router.post('/products', productController.addProduct);

// Обновить товар по ID
router.put('/products/:id', productController.updateProductById);

// Удалить товар по ID
router.delete('/products/:id', productController.deleteProductById);

module.exports = router;

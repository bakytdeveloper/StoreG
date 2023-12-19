// server/index.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer'); // Подключаем multer для обработки файлов
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());


// Настроим multer для сохранения файлов в папку "uploads"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Разрешим парсинг JSON-запросов
app.use(bodyParser.json());

// Настроим статический маршрут для раздачи изображений
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Database connection
require('./config/db');

// Routes

const productsRouter = require('./routes/products');
app.use('/', productsRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`СЕРВЕР РАБОТАЕТ НА ${PORT} ПОРТУ !!!!!`);
});

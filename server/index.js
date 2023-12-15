// server/index.js
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
require('./config/db');

// Routes

// const productsRouter = require('./routes/products');
// app.use('/', productsRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`СЕРВЕР РАБОТАЕТ НА ${PORT} ПОРТУ !!!!!`);
});

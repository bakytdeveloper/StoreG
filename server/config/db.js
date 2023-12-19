// server/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();


// mongoose.connect('mongodb+srv://bakytdeveloper:admin_store@adminstore.bqagbhb.mongodb.net/adminStore?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
mongoose.connect(process.env.MONGODB_URI)
// mongoose.connect('mongodb+srv://bakytdeveloper:store_g@storeg.x4bhljx.mongodb.net/StoreG?retryWrites=true&w=majority')
    .then(() => console.log('БАЗА ДАННЫХ МОНГО ПОДКЛЮЧЕННА!!!'))
    .catch(err => console.error('Error connecting to the database:', err));

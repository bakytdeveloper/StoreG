// server/config/db.js
const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://bakytdeveloper:admin_store@adminstore.bqagbhb.mongodb.net/adminStore?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
mongoose.connect('mongodb+srv://bakytdeveloper:store_g@storeg.x4bhljx.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('БАЗА ДАННЫХ МОНГО ПОДКЛЮЧЕННА!!!'))
    .catch(err => console.error('Error connecting to the database:', err));

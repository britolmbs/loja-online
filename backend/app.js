const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const productRoutes = require('./routes/productRoutes');


app.use(bodyParser.json());
app.use(cors());

app.use('/api/products', productRoutes);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'yourUsername',
    password: 'yourPassword',
    database: 'loja-online'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao connectar ao MySQL' , err);
    } else {
        console.log('connectado ao MySQL');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));

module.exports = db;
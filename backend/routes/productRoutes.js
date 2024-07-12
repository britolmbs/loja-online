const db = require('../app');

export.getAllProducts = (req, res) => {
    db.query('SELECT * FROM products', (err, results) = >{
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};

exports.getProductById = (req, res) =>{
    const productId = req.params.id;
    db.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
        if(err) {
            return res.status(500).send(err);
        }
        if (results.length === 0){
            return res.status(404).send('Produto não encontrado');
        }
        res.json(results[0]);
    });
};

exports.createProduct = (req, res) => {
    const { nome, descricao, preco } = req.body;
    const query = 'INSERT INTO products (nome, descricao, preco) VALUE (?, ?, ?)';
    db.query(query, [nome, descricao, preco], (err, results) =>{
        if(err) {
            return res.status(500).send(err);
        }
        res.status(201).sed('Produto criado');
    });
};
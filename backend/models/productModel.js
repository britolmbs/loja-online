const db = require('../app');  // Certifique-se que `db` seja exportado no `app.js`

// Função para buscar todos os produtos
exports.getAllProducts = (callback) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Função para buscar um produto pelo ID
exports.getProductById = (id, callback) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

// Função para criar um novo produto
exports.createProduct = (product, callback) => {
  const { name, description, price } = product;
  const query = 'INSERT INTO products (name, description, price) VALUES (?, ?, ?)';
  db.query(query, [name, description, price], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results.insertId);
  });
};

// Função para atualizar um produto
exports.updateProduct = (id, product, callback) => {
  const { name, description, price } = product;
  const query = 'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?';
  db.query(query, [name, description, price, id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Função para deletar um produto
exports.deleteProduct = (id, callback) => {
  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

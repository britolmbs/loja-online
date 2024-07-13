const Product = require('../models/productModel');

// Listar todos os produtos
exports.getAllProducts = (req, res) => {
  Product.getAllProducts((err, products) => {
    if (err) {
      return res.status(500).send({ error: 'Erro ao buscar produtos' });
    }
    res.status(200).json(products);
  });
};

// Obter um produto pelo ID
exports.getProductById = (req, res) => {
  const productId = req.params.id;
  Product.getProductById(productId, (err, product) => {
    if (err) {
      return res.status(500).send({ error: 'Erro ao buscar produto' });
    }
    if (!product) {
      return res.status(404).send({ message: 'Produto não encontrado' });
    }
    res.status(200).json(product);
  });
};

// Criar um novo produto
exports.createProduct = (req, res) => {
  const newProduct = req.body;
  Product.createProduct(newProduct, (err, productId) => {
    if (err) {
      return res.status(500).send({ error: 'Erro ao criar produto' });
    }
    res.status(201).send({ message: 'Produto criado com sucesso', productId });
  });
};

// Atualizar um produto
exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  Product.updateProduct(productId, updatedProduct, (err) => {
    if (err) {
      return res.status(500).send({ error: 'Erro ao atualizar produto' });
    }
    res.status(200).send({ message: 'Produto atualizado com sucesso' });
  });
};

// Deletar um produto
exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  Product.deleteProduct(productId, (err) => {
    if (err) {
      return res.status(500).send({ error: 'Erro ao deletar produto' });
    }
    res.status(200).send({ message: 'Produto deletado com sucesso' });
  });
};

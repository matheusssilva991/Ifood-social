const produtoModel = require('../models/produto.model');

class ProdutoService {
  async findAll() {
    try {
      const produtos = await produtoModel.findAll();
      return { produtos, status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async findById(id) {
    try {
      // Verifica se o produto existe
      const produto = await produtoModel.findById(id);
      if (!produto) {
        return { error: 'Produto não encontrado.', status: 404 };
      }
      return { produto, status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }
}

module.exports = new ProdutoService();

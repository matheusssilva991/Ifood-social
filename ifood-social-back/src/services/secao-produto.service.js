const secaoProdutoModel = require('../models/secao-produto.model');
const produtoModel = require('../models/produto.model');
const secaoModel = require('../models/secao.model');

class SecaoProdutoService {
  async findAll() {
    try {
      const secoesProdutos = await secaoProdutoModel.findAll();

      return { secoesProdutos, status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async findById(id) {
    try {
      // Verifica se a seção de produto existe
      const secaoProduto = await secaoProdutoModel.findById(id);
      if (!secaoProduto) {
        return { error: 'Seção de produto não encontrada.', status: 404 };
      }
      return { secaoProduto, status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async create(data) {
    try {
      // Verifica se os campos obrigatórios foram preenchidos
      if (!data.idSecao || !data.idProduto || !data.numOrdem) {
        return { error: 'Campos obrigatórios não preenchidos.', status: 400 };
      }

      // Verifica se o produto existe
      const produto = await produtoModel.findById(data.idProduto);
      if (!produto) {
        return { error: 'Produto não encontrado.', status: 400 };
      }

      // Verifica se a seção existe
      const secao = await secaoModel.findById(data.idSecao);
      if (!secao) {
        return { error: 'Seção não encontrada.', status: 400 };
      }

      // Verifica se a seção de produto já existe
      const secaoProduto = await secaoProdutoModel.findBySecaoEProduto(data.idSecao, data.idProduto);
      if (secaoProduto) {
        return { error: 'Seção de produto já cadastrada.', status: 400 };
      }

      await secaoProdutoModel.create(data);
      return { message: 'Seção de produto criada com sucesso.', status: 201 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async update(id, data) {
    try {
      // Verifica se a seção de produto existe
      const secaoProduto = await secaoProdutoModel.findById(id);
      if (!secaoProduto) {
        return { error: 'Seção de produto não encontrada.', status: 404 };
      }

      // Verifica se o produto existe
      if (data.idProduto) {
        const produto = await produtoModel.findById(data.idProduto);
        if (!produto) {
          return { error: 'Produto não encontrado.', status: 400 };
        }
      }

      // Verifica se a seção existe
      if (data.idSecao) {
        const secao = await secaoModel.findById(data.idSecao);
        if (!secao) {
          return { error: 'Seção não encontrada.', status: 400 };
        }
      }

      // Verifica se a seção de produto já existe
      if (data.idProduto && data.idSecao) {
        const secaoProdutoExists = await secaoProdutoModel.findBySecaoEProduto(data.idSecao, data.idProduto);
        if (secaoProdutoExists && secaoProdutoExists.id !== id) {
          return { error: 'Seção de produto já cadastrada.', status: 400 };
        }
      }

      for (const key in data) {
        if (data[key]) {
          secaoProduto[key] = data[key];
        }
      }

      await secaoProdutoModel.update(id, secaoProduto);
      return { message: 'Seção de produto atualizada com sucesso.', status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async delete(id) {
    try {
      // Verifica se a seção de produto existe
      const secaoProduto = await secaoProdutoModel.findById(id);
      if (!secaoProduto) {
        return { error: 'Seção de produto não encontrada.', status: 404 };
      }
      await secaoProdutoModel.delete(id);
      return { message: 'Seção de produto deletada com sucesso.', status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }
}

module.exports = new SecaoProdutoService();

const secaoModel = require('../models/secao.model');
const cardapioModel = require('../models/cardapio.model');

class SecaoCardapioService {
  async findAll() {
    try {
      const secoes = await secaoModel.findAll();
      return { secoes, status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async findById(id) {
    try {
      // Verifica se a seção de cardápio existe
      const secao = await secaoModel.findById(id);
      if (!secao) {
        return { error: 'Seção de cardapio não encontrada.', status: 404 };
      }
      return { secao, status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async create(data) {
    try {
      // Verifica se os campos obrigatórios foram preenchidos
      if (!data.descricao || !data.titulo || data.numOrdem == undefined || !data.idCardapio) {
        return { error: 'Campos obrigatórios não preenchidos.', status: 400 };
      }

      // Verifica se o número de ordem é maior que zero
      if (data.numOrdem < 0) {
        return { error: 'Número de ordem deve ser maior ou igual a zero.', status: 400 };
      }

      // Verifica se a seção de cardápio já existe
      const secao = await secaoModel.findByTitulo(data.titulo);
      if (secao) {
        return { error: 'Seção de cardápio já cadastrada.', status: 400 };
      }

      // Verifica se o cardápio existe
      const cardapio = await cardapioModel.findById(data.idCardapio);
      if (!cardapio) {
        return { error: 'Cardápio não encontrado.', status: 400 };
      }

      await secaoModel.create(data);
      return { message: 'Seção de cardápio criada com sucesso.', status: 201 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async update(id, data) {
    try {
      // Verifica se a seção de cardápio existe
      const secao = await secaoModel.findById(id);
      if (!secao) {
        return { error: 'Seção de cardápio não encontrada.', status: 404 };
      }

      // Verifica se os campos obrigatórios foram preenchidos
      if (data.numOrdem && data.numOrdem <= 0) {
        return { error: 'Número de ordem deve ser maior que zero.', status: 400 };
      }

      // Verifica se a seção de cardápio já existe
      if (data.titulo) {
        if (secao.titulo !== data.titulo) {
          const secaoByTitulo = await secaoModel.findByTitulo(data.titulo);
          if (secaoByTitulo) {
            return { error: 'Seção de cardápio já cadastrada.', status: 400 };
          }
        }
      }

      // Verifica se o cardápio existe
      if (data.idCardapio) {
        const cardapio = await cardapioModel.findById(data.idCardapio);
        if (!cardapio) {
          return { error: 'Cardápio não encontrado.', status: 400 };
        }
      }

      for (const key in data) {
        if (data[key]) {
          secao[key] = data[key];
        }
      }

      await secaoModel.update(id, secao);
      return { message: 'Seção de cardápio atualizada com sucesso.', status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async delete(id) {
    try {
      // Verifica se a seção de cardápio existe
      const secao = await secaoModel.findById(id);
      if (!secao) {
        return { error: 'Seção de cardápio não encontrada.', status: 404 };
      }
      await secaoModel.delete(id);
      return { message: 'Seção de cardápio deletada com sucesso.', status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }
}

module.exports = new SecaoCardapioService();

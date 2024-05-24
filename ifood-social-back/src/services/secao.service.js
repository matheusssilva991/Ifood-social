const secaoModel = require('../models/secao.model');

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
      if (!data.descricao || !data.titulo || !data.numOrdem || !data.idCardapio) {
        return { error: 'Campos obrigatórios não preenchidos.', status: 400 };
      }

      if (data.numOrdem <= 0) {
        return { error: 'Número de ordem deve ser maior que zero.', status: 400 };
      }

      const secao = await secaoModel.findByTitulo(data.titulo);
      if (secao) {
        return { error: 'Seção de cardápio já cadastrada.', status: 400 };
      }

      await secaoModel.create(data);
      return { message: 'Seção de cardápio criada com sucesso.', status: 201 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async update(id, data) {
    try {
      const secao = await secaoModel.findById(id);
      if (!secao) {
        return { error: 'Seção de cardápio não encontrada.', status: 404 };
      }

      if (data.numOrdem && data.numOrdem <= 0) {
        return { error: 'Número de ordem deve ser maior que zero.', status: 400 };
      }

      if (data.titulo) {
        if (secao.titulo !== data.titulo) {
          const secaoByTitulo = await secaoModel.findByTitulo(data.titulo);
          if (secaoByTitulo) {
            return { error: 'Seção de cardápio já cadastrada.', status: 400 };
          }
        }
      }

      await secaoModel.update(id, data);
      return { message: 'Seção de cardápio atualizada com sucesso.', status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async delete(id) {
    try {
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

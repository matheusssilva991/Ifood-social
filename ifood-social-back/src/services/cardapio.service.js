const cardapioModel = require('../models/cardapio.model');

class CardapioService {
  async findAll() {
    try {
      const cardapios = await cardapioModel.findAll();
      return { cardapios, status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async findById(id) {
    try {
      const cardapio = await cardapioModel.findById(id);
      if (!cardapio) {
        return { error: 'Cardápio não encontrado.', status: 404 };
      }
      return { cardapio, status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async create(data) {
    try {
      if (!data.descricao || !data.titulo || !data.idEmpreendimento) {
        return { error: 'Campos obrigatórios não preenchidos.', status: 400 };
      }

      const cardapio = await cardapioModel.findByTitulo(data.titulo);

      if (cardapio) {
        return { error: 'Cardápio já cadastrado.', status: 400 };
      }

      await cardapioModel.create(data);
      return { message: 'Cardápio criado com sucesso.', status: 201 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async update(id, data) {
    try {
      const cardapio = await cardapioModel.findById(id);
      if (!cardapio) {
        return { error: 'Cardápio não encontrado.', status: 404 };
      }

      if (data.titulo) {
        const cardapioByTitulo = await cardapioModel.findByTitulo(data.titulo);
        if (cardapioByTitulo && cardapioByTitulo.id !== id) {
          return { error: 'Cardápio já cadastrado.', status: 400 };
        }
      }

      await cardapioModel.update(id, data);
      return { message: 'Cardápio atualizado com sucesso.', status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async delete(id) {
    try {
      const cardapio = await cardapioModel.findById(id);
      if (!cardapio) {
        return { error: 'Cardápio não encontrado.', status: 404 };
      }
      await cardapioModel.delete(id);
      return { message: 'Cardápio deletado com sucesso.', status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }
}

module.exports = new CardapioService();

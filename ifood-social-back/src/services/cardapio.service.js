const cardapioModel = require('../models/cardapio.model');
const empreendimentoModel = require('../models/empreendimento.model');

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
      // Verifica se o cardápio existe
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
      // Verifica se os campos obrigatórios foram preenchidos
      if (!data.descricao || !data.titulo || !data.idEmpreendimento) {
        return { error: 'Campos obrigatórios não preenchidos.', status: 400 };
      }

      // Verifica se o cardápio já existe
      const cardapio = await cardapioModel.findByTitulo(data.titulo);
      if (cardapio && cardapio.idEmpreendimento == data.idEmpreendimento) {
        return { error: 'Cardápio já cadastrado.', status: 400 };
      }

      // Verifica se o empreendimento existe
      const empreendimento = await empreendimentoModel.findById(data.idEmpreendimento);
      if (!empreendimento) {
        return { error: 'Empreendimento não encontrado.', status: 400 };
      }

      await cardapioModel.create(data);
      return { message: 'Cardápio criado com sucesso.', status: 201 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async update(id, data) {
    try {
      // Verifica se o cardápio existe
      const cardapio = await cardapioModel.findById(id);
      if (!cardapio) {
        return { error: 'Cardápio não encontrado.', status: 404 };
      }

      // Verifica se os campos obrigatórios foram preenchidos
      if (data.titulo) {
        const cardapioByTitulo = await cardapioModel.findByTitulo(data.titulo);
        if (cardapioByTitulo && cardapioByTitulo.id != id &&
          cardapioByTitulo.idEmpreendimento == cardapio.idEmpreendimento) {
          return { error: 'Cardápio já cadastrado.', status: 400 };
        }
      }

      // Verifica se o empreendimento existe
      if (data.idEmpreendimento) {
        const empreendimento = await empreendimentoModel.findById(data.idEmpreendimento);
        if (!empreendimento) {
          return { error: 'Empreendimento não encontrado.', status: 400 };
        }
      }

      for (const key in data) {
        if (data[key] !== undefined) {
          cardapio[key] = data[key];
        }
      }
      await cardapioModel.update(id, cardapio);
      return { message: 'Cardápio atualizado com sucesso.', status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async delete(id) {
    try {
      // Verifica se o cardápio existe
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

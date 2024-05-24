const empreendimentoModel = require('../models/empreendimento.model');

class EmprendimentoService {
  async findAll() {
    try {
      const empreendimentos = await empreendimentoModel.findAll();
      return { empreendimentos: empreendimentos, status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async findById(id) {
    try {
      // Verifica se o empreendimento existe
      const empreendimento = await empreendimentoModel.findById(id);
      if (!empreendimento) {
        return { error: 'Empreendimento não encontrado.', status: 404 };
      }
      return { empreendimento, status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }
}

module.exports = new EmprendimentoService();

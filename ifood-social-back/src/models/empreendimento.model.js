const connection = require('../database/database.connection');

class EmpreendimentoModel {
  async findAll() {
    const rows = await connection.query('SELECT * FROM EMPREENDIMENTO INNER JOIN CIDADE ON EMPREENDIMENTO.COD_CIDADE = CIDADE.COD_CIDADE;');

    const empreendimentos = rows.map((row) => {
      return {
        id: row.COD_EMPREEDIMENTO,
        descricao: row.DCR_EMPREENDIMENTO,
        nome: row.NOME_FANTASIA,
        endereco: row.DCR_ENDERECO,
        complemento: row.DCR_COMPLEMENTO,
        cep: row.NUM_CEP,
        cidade: {
          id: row.COD_CIDADE,
          descricao: row.DCR_CIDADE,
        }
      }
    });
    return empreendimentos;
  }

  async findById(id) {
    const rows = await connection.query('SELECT * FROM EMPREENDIMENTO INNER JOIN CIDADE ON EMPREENDIMENTO.COD_CIDADE = CIDADE.COD_CIDADE WHERE COD_EMPREEDIMENTO = ?', [id]);

    if (rows.length === 0) {
      return null;
    }

    const empreendimento = {
      id: rows[0].COD_EMPREEDIMENTO,
      descricao: rows[0].DCR_EMPREENDIMENTO,
      nome: rows[0].NOME_FANTASIA,
      endereco: rows[0].DCR_ENDERECO,
      complemento: rows[0].DCR_COMPLEMENTO,
      cep: rows[0].NUM_CEP,
      cidade: {
        id: rows[0].COD_CIDADE,
        descricao: rows[0].DCR_CIDADE,
      }
    }
    return empreendimento;
  }
}

module.exports = new EmpreendimentoModel();

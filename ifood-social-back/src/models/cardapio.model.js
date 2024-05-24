const connection = require('../../database/database.connection');

class CardapioModel {
  async findAll() {
    const rows = await connection.query('SELECT * FROM CARDAPIO');
    return rows;
  }

  async findById(id) {
    const rows = await connection.query('SELECT * FROM CARDAPIO WHERE COD_CARDAPIO = ?', [id]);
    return rows;
  }

  async create({ descricao, titulo, idEmpreendimento }) {
    await connection.query(
      'INSERT INTO CARDAPIO (DCR_CARDAPIO, DCR_TITULO_APRES, COD_EMPREENDIMENTO) VALUES (?, ?)',
       [descricao, titulo, idEmpreendimento]);
  }

  async update(id, { descricao, titulo, idEmpreendimento}) {
    await connection.query(
      'UPDATE CARDAPIO SET DCR_CARDAPIO = ?, DCR_TITULO_APRES = ?, COD_EMPREENDIMENTO = ? WHERE COD_CARDAPIO = ?',
      [descricao, titulo, idEmpreendimento, id]
    );
  }

  async delete(id) {
    await connection.query('DELETE FROM CARDAPIO WHERE COD_CARDAPIO = ?', [id]);
  }
}

module.exports = new CardapioModel();

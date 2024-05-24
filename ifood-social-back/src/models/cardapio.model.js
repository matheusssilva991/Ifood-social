const connection = require('../database/database.connection');

class CardapioModel {
  async findAll() {
    const rows = await connection.query('SELECT * FROM CARDAPIO');

    const cardapios = rows.map((row) => {
      return {
        id: row.COD_CARDAPIO,
        descricao: row.DCR_CARDAPIO,
        titulo: row.DCR_TITULO_APRES,
        idEmpreendimento: row.COD_EMPREEDIMENTO
      }
    });
    return cardapios;
  }

  async findById(id) {
    const rows = await connection.query('SELECT * FROM CARDAPIO WHERE COD_CARDAPIO = ?', [id]);

    if (rows.length === 0) {
      return null;
    }

    const cardapio = {
      id: rows[0].COD_CARDAPIO,
      descricao: rows[0].DCR_CARDAPIO,
      titulo: rows[0].DCR_TITULO_APRES,
      idEmpreendimento: rows[0].COD_EMPREEDIMENTO
    }
    return cardapio;
  }

  async create({ descricao, titulo, idEmpreendimento }) {
    let id = await connection.query('SELECT MAX(COD_CARDAPIO) + 1 AS COD_CARDAPIO FROM CARDAPIO');
    id = id[0].COD_CARDAPIO || 1;

    await connection.query(
      'INSERT INTO CARDAPIO (COD_CARDAPIO, DCR_CARDAPIO, DCR_TITULO_APRES, COD_EMPREEDIMENTO) VALUES (?, ?, ?, ?)',
       [id, descricao, titulo, idEmpreendimento]);
  }

  async update(id, { descricao, titulo, idEmpreendimento}) {
    await connection.query(
      'UPDATE CARDAPIO SET DCR_CARDAPIO = ?, DCR_TITULO_APRES = ?, COD_EMPREEDIMENTO = ? WHERE COD_CARDAPIO = ?',
      [descricao, titulo, idEmpreendimento, id]
    );
  }

  async delete(id) {
    await connection.query('DELETE FROM CARDAPIO WHERE COD_CARDAPIO = ?', [id]);
  }

  async findByTitulo(titulo) {
    const rows = await connection.query('SELECT * FROM CARDAPIO WHERE DCR_TITULO_APRES = ?', [titulo]);

    if (rows.length === 0) {
      return null;
    }

    const cardapio = {
      id: rows[0].COD_CARDAPIO,
      descricao: rows[0].DCR_CARDAPIO,
      titulo: rows[0].DCR_TITULO_APRES,
      idEmpreendimento: rows[0].COD_EMPREEDIMENTO
    }
    return cardapio;
  }
}

module.exports = new CardapioModel();

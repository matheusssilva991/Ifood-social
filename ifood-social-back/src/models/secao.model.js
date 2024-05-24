const connection = require('../database/database.connection');

class SecaoModel {
  async findAll() {
    const rows = await connection.query('SELECT * FROM SECAO_CARDAPIO');

    const secoes = rows.map((row) => {
      return {
        id: row.COD_SECAO_CARDAPIO,
        descricao: row.DCR_SECAO_CARDAPIO,
        titulo: row.DCR_TITULO_APRES,
        numOrdem: row.NUM_ORDEM,
        idCardapio: row.COD_CARDAPIO
      }
    });
    return secoes;
  }

  async findById(id) {
    const rows = await connection.query('SELECT * FROM SECAO_CARDAPIO WHERE COD_SECAO_CARDAPIO = ?', [id]);

    if (rows.length === 0) {
      return null;
    }

    const secao = {
      id: rows[0].COD_SECAO_CARDAPIO,
      descricao: rows[0].DCR_SECAO_CARDAPIO,
      titulo: rows[0].DCR_TITULO_APRES,
      numOrdem: rows[0].NUM_ORDEM,
      idCardapio: rows[0].COD_CARDAPIO
    }
    return secao;
  }

  async create({ descricao, titulo, numOrdem, idCardapio }) {
    let id = await connection.query('SELECT MAX(COD_SECAO_CARDAPIO) + 1 AS COD_SECAO_CARDAPIO FROM SECAO_CARDAPIO');
    id = id[0].COD_SECAO_CARDAPIO || 1;

    await connection.query(
      'INSERT INTO SECAO_CARDAPIO (COD_SECAO_CARDAPIO, DCR_SECAO_CARDAPIO, DCR_TITULO_APRES, NUM_ORDEM, COD_CARDAPIO) VALUES (?, ?, ?, ?, ?)',
       [id, descricao, titulo, numOrdem, idCardapio]);
  }

  async update(id, { descricao, titulo, numOrdem, idCardapio}) {
    await connection.query(
      'UPDATE SECAO_CARDAPIO SET DCR_SECAO_CARDAPIO = ?, DCR_TITULO_APRES = ?, NUM_ORDEM = ?, COD_CARDAPIO = ? WHERE COD_SECAO_CARDAPIO = ?',
      [descricao, titulo, numOrdem, idCardapio, id]
    );
  }

  async delete(id) {
    await connection.query('DELETE FROM SECAO_CARDAPIO WHERE COD_SECAO_CARDAPIO = ?', [id]);
  }

  async findByTitulo(titulo) {
    const rows = await connection.query('SELECT * FROM SECAO_CARDAPIO WHERE DCR_TITULO_APRES = ?', [titulo]);

    if (rows.length === 0) {
      return null;
    }

    const secao = {
      id: rows[0].COD_SECAO_CARDAPIO,
      descricao: rows[0].DCR_SECAO_CARDAPIO,
      titulo: rows[0].DCR_TITULO_APRES,
      numOrdem: rows[0].NUM_ORDEM,
      idCardapio: rows[0].COD_CARDAPIO
    }

    return secao;
  }
}

module.exports = new SecaoModel();

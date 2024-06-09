const connection = require('../database/database.connection');

class ProdutoModel {
  async findAll() {
    const [rows] = await connection.execute('SELECT * FROM PRODUTO INNER JOIN CATEGORIA ON PRODUTO.COD_CATEGORIA = CATEGORIA.COD_CATEGORIA;');

    const produtos = rows.map((row) => {
      return {
        id: row.COD_PRODUTO,
        descricao: row.DCR_PRODUTO,
        imagem: row.IMG_PRODUTO,
        preco: row.VLR_PRODUTO,
        disponibilidade: row.FLAG_DISPONIVEL,
        categoria: {
          id: row.COD_CATEGORIA,
          descricao: row.DCR_CATEGORIA,
          imagem: row.IMG_CATEGORIA,
        },
        idEmpreendimento: row.COD_EMPREEDIMENTO,
      }
    });
    return produtos;
  }

  async findById(id) {
    const [rows] = await connection.execute('SELECT * FROM PRODUTO INNER JOIN CATEGORIA ON PRODUTO.COD_CATEGORIA = CATEGORIA.COD_CATEGORIA WHERE COD_PRODUTO = ?',
     [id]);

    if (rows.length === 0) {
      return null;
    }

    const produto = {
      id: rows[0].COD_PRODUTO,
      descricao: rows[0].DCR_PRODUTO,
      imagem: rows[0].IMG_PRODUTO,
      preco: rows[0].VLR_PRODUTO,
      disponibilidade: rows[0].FLAG_DISPONIVEL,
      categoria: {
        id: rows[0].COD_CATEGORIA,
        descricao: rows[0].DCR_CATEGORIA,
        imagem: rows[0].IMG_CATEGORIA,
      },
      idEmpreendimento: rows[0].COD_EMPREEDIMENTO,
    }
    return produto;
  }
}

module.exports = new ProdutoModel();

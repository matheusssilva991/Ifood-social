const connection = require('../database/database.connection');

class SecaoProdutoModel {
  async findAll() {
    const rows = await connection.query('SELECT * FROM SECAO_PRODUTO INNER JOIN PRODUTO ON SECAO_PRODUTO.PRODUTO_COD_PRODUTO = PRODUTO.COD_PRODUTO INNER JOIN CATEGORIA ON PRODUTO.COD_CATEGORIA = CATEGORIA.COD_CATEGORIA');

    const secoesProdutos = rows.map((row) => {
      return {
        id: row.COD_SECAO_PRODUTO,
        numOrdem: row.NUM_ORDEM,
        idSecao: row.SECAO_CARDAPIO_COD_SECAO_CARDAPIO,
        produto: {
          id: row.COD_PRODUTO,
          descricao: row.DCR_PRODUTO,
          imagem: row.IMG_PRODUTO,
          preco: row.VLR_PRODUTO,
          disponibilidade: row.FLAG_DISPONIVEL,
          categoria: {
            id: row.COD_CATEGORIA,
            descricao: row.DCR_CATEGORIA,
          }
        }

      }
    });

    return secoesProdutos;
  }

  async findById(id) {
    const rows = await connection.query('SELECT * FROM SECAO_PRODUTO INNER JOIN PRODUTO ON SECAO_PRODUTO.PRODUTO_COD_PRODUTO = PRODUTO.COD_PRODUTO INNER JOIN CATEGORIA ON PRODUTO.COD_CATEGORIA = CATEGORIA.COD_CATEGORIA WHERE COD_SECAO_PRODUTO = ?',
     [id]);

    if (rows.length === 0) {
      return null;
    }

    const secaoProduto = {
      id: rows[0].COD_SECAO_PRODUTO,
      numOrdem: rows[0].NUM_ORDEM,
      idSecao: rows[0].SECAO_CARDAPIO_COD_SECAO_CARDAPIO,
      produto: {
        id: rows[0].COD_PRODUTO,
        descricao: rows[0].DCR_PRODUTO,
        imagem: rows[0].IMG_PRODUTO,
        preco: rows[0].VLR_PRODUTO,
        disponibilidade: rows[0].FLAG_DISPONIVEL,
        categoria: {
          id: rows[0].COD_CATEGORIA,
          descricao: rows[0].DCR_CATEGORIA,
        }
      }
    }
    return secaoProduto;
  }

  async findBySecaoEProduto(idSecao, idProduto) {
    const rows = await connection.query('SELECT * FROM SECAO_PRODUTO WHERE SECAO_CARDAPIO_COD_SECAO_CARDAPIO = ? AND PRODUTO_COD_PRODUTO = ?',
     [idSecao, idProduto]);

    if (rows.length === 0) {
      return null;
    }

    const secaoProduto = {
      id: rows[0].COD_SECAO_PRODUTO,
      numOrdem: rows[0].NUM_ORDEM,
      idSecao: rows[0].SECAO_CARDAPIO_COD_SECAO_CARDAPIO,
      idProduto: rows[0].PRODUTO_COD_PRODUTO
    }
    return secaoProduto;
  }

  async create({ numOrdem, idProduto, idSecao }) {
    let id = await connection.query('SELECT MAX(COD_SECAO_PRODUTO) + 1 AS COD_SECAO_PRODUTO FROM SECAO_PRODUTO');
    id = id[0].COD_SECAO_PRODUTO || 1;

    await connection.query(
      'INSERT INTO SECAO_PRODUTO (COD_SECAO_PRODUTO, NUM_ORDEM, COD_PRODUTO, COD_SECAO) VALUES (?, ?, ?, ?)',
       [id, numOrdem, idProduto, idSecao]);
  }

  async update(id, { numOrdem, idProduto, idSecao }) {
    await connection.query(
      'UPDATE SECAO_PRODUTO SET NUM_ORDEM = ?, COD_PRODUTO = ?, COD_SECAO = ? WHERE COD_SECAO_PRODUTO = ?',
      [numOrdem, idProduto, idSecao, id]
    );
  }

  async delete(id) {
    await connection.query('DELETE FROM SECAO_PRODUTO WHERE COD_SECAO_PRODUTO = ?', [id]);
  }
}

module.exports = new SecaoProdutoModel();

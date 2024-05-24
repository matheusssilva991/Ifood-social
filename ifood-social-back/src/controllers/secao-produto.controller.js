const express = require("express");
const router = express.Router();

const secaoProdutoService = require('../services/secao-produto.service');

router.get('/secoes-produtos', async (req, res) => {
  const result = await secaoProdutoService.findAll();
  
  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json(result.secoesProdutos);
});

router.get('/secao-produto/:id', async (req, res) => {
  const { id } = req.params;
  const result = await secaoProdutoService.findById(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json(result.secaoProduto);
});

router.post('/secao-produto', async (req, res) => {
  const data = req.body;
  const result = await secaoProdutoService.create(data);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json({ message: result.message });
});

router.put('/secao-produto/:id', async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const result = await secaoProdutoService.update(id, data);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json({ message: result.message });
});

router.delete('/secao-produto/:id', async (req, res) => {
  const { id } = req.params;
  const result = await secaoProdutoService.delete(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json({ message: result.message });
});

module.exports = router;

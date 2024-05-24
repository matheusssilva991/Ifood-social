const express = require('express');
const router = express.Router();

const produtoService = require('../services/produto.service');

router.get('/produtos', async (req, res) => {
  const result = await produtoService.findAll();

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json(result.produtos);
});

router.get('/produto/:id', async (req, res) => {
  const { id } = req.params;
  const result = await produtoService.findById(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json(result.produto);
});

module.exports = router;

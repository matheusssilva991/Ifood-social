const express = require("express");
const router = express.Router();

const secaoService = require('../services/secao.service');

router.get('/secoes', async (req, res) => {
  const result = await secaoService.findAll();

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json(result.secoes);
});

router.get('/secao/:id', async (req, res) => {
  const { id } = req.params;
  const result = await secaoService.findById(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json(result.secao);
});

router.post('/secao', async (req, res) => {
  const data = req.body;
  const result = await secaoService.create(data);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json({ message: result.message });
});

router.put('/secao/:id', async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const result = await secaoService.update(id, data);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json({ message: result.message });
});

router.delete('/secao/:id', async (req, res) => {
  const { id } = req.params;
  const result = await secaoService.delete(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json({ message: result.message });
});

module.exports = router;

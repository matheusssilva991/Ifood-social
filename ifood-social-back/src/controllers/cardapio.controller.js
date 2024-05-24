const express = require("express");
const router = express.Router();

const cardapioService = require('../services/cardapio.service');

router.get('/cardapios', async (req, res) => {
  const result = await cardapioService.findAll();

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }
  console.log(result.cardapios);
  res.status(result.status).json(result.cardapios);
});

router.get('/cardapio/:id', async (req, res) => {
  const { id } = req.params;
  const result = await cardapioService.findById(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json(result.cardapio);
});

router.post('/cardapio', async (req, res) => {
  const data = req.body;
  const result = await cardapioService.create(data);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json({ message: result.message });
});

router.put('/cardapio/:id', async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const result = await cardapioService.update(id, data);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json({ message: result.message });
});

router.delete('/cardapio/:id', async (req, res) => {
  const { id } = req.params;
  const result = await cardapioService.delete(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json({ message: result.message });
});

module.exports = router;

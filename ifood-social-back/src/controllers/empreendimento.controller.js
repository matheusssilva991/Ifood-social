const express = require('express');
const router = express.Router();

const empreendimentoService = require('../services/empreendimento.service');

router.get('/empreendimentos', async (req, res) => {
  const result = await empreendimentoService.findAll();

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json(result.empreendimentos);
});

router.get('/empreendimento/:id', async (req, res) => {
  const { id } = req.params;
  const result = await empreendimentoService.findById(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json(result.empreendimento);
});

module.exports = router;

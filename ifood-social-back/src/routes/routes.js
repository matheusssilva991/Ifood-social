const express = require('express');
const router = express.Router();

const cardapioController = require('../controllers/cardapio.controller');
const secaoController = require('../controllers/secao.controller');

router.use('/', cardapioController);
router.use('/', secaoController);


module.exports = router;

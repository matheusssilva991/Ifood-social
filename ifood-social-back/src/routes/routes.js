const express = require('express');
const router = express.Router();

const cardapioController = require('../controllers/cardapio.controller');
const secaoController = require('../controllers/secao.controller');
const empreendimentoController = require('../controllers/empreendimento.controller');
const produtoController = require('../controllers/produto.controller');
const secaoProdutoController = require('../controllers/secao-produto.controller');

router.use('/', cardapioController);
router.use('/', secaoController);
router.use('/', empreendimentoController);
router.use('/', produtoController);
router.use('/', secaoProdutoController);

module.exports = router;

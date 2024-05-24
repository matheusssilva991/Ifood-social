const express = require('express');
const router = express.Router();

const cardapioController = require('../controllers/cardapio.controller');

router.use('/', cardapioController);


module.exports = router;

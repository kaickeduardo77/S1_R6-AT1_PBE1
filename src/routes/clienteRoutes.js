const express = require('express');
const clienteRouter = express.Router();
const { clienteController } = require('../controllers/clienteController');

clienteRouter.get('/cliente', clienteController.buscarTodosCliente);
clienteRouter.post('/cliente', clienteController.criarCliente);

module.exports = {clienteRouter}

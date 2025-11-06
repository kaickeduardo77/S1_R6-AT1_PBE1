const express = require('express');
const clienteRouter = express.Router();
const { clienteController } = require('../controllers/clienteController');


clienteRouter.get('/cliente', clienteController.buscarTodosCliente);
clienteRouter.post('/cliente', clienteController.criarCliente);
clienteRouter.get('/cliente/id', clienteController.buscarClientePorId);
clienteRouter.put('/cliente/:id', clienteController.editarCliente);
clienteRouter.delete('/cliente/:id', clienteController.deletarCliente);

module.exports = { clienteRouter };

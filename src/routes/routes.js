const express =require('express');
const router = express.Router();


//referencia do arquivo de rotas
const{produtoRoutes} = require('./produtoRoutes');
const{clienteRouter} = require('./clienteRoutes');

router.use('/', produtoRoutes);
router.use('/',clienteRouter);

module.exports = {router}
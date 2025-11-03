const { clienteModel } = require('../models/clienteModel');

const clienteController = {
  buscarTodosCliente: async (req, res) => {
    try {
      const cliente = await clienteModel.selecionarTodos();
      res.status(200).json(cliente);
    } catch (error) {
      console.error(error)
      res.status(500).json({ messsage: 'Erro ao buscar clientes', errorMessage : error.messsage});
    }
  },

  criarCliente: async (req, res) => {
    try {
      const { nome_cliente, cpf } = req.body;
      if (!nome_cliente || !cpf) {
        return res.status(400).json({ error: 'Nome e CPF são obrigatórios' });
      }

      const existe = await clienteModel.buscarCpf(cpf);
    
      if (existe.length > 0) {
        return res.status(409).json({ error: 'CPF já cadastrado' });
      }

      await clienteModel.inserirCliente(nome_cliente, cpf);
      res.status(201).json({ mensagem: 'Cliente criado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ messsage: 'Erro ao buscar clientes', errorMessage : Error.messsage}); 
    }
  }
};

module.exports = { clienteController };

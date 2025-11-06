const clienteModel = require('../models/clienteModel'); // ← sem chaves

const clienteController = {

  
  buscarTodosCliente: async (req, res) => {
    try {
      const clientes = await clienteModel.selecionarTodos();
      res.status(200).json(clientes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar clientes', errorMessage: error.message });
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
      res.status(500).json({ message: 'Erro ao criar cliente', errorMessage: error.message });
    }
  },


  buscarClientePorId: async (req, res) => {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'ID do cliente é obrigatório' });
      }

      const cliente = await clienteModel.buscarPorId(id);
      if (cliente.length === 0) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      res.status(200).json(cliente);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar cliente por ID', errorMessage: error.message });
    }
  },

  
  editarCliente: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome_cliente, cpf } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'ID do cliente é obrigatório' });
      }

      if (!nome_cliente || !cpf) {
        return res.status(400).json({ error: 'Nome e CPF são obrigatórios' });
      }

      const clienteExistente = await clienteModel.buscarPorId(id);
      if (clienteExistente.length === 0) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      await clienteModel.atualizarCliente(id, nome_cliente, cpf);
      res.status(200).json({ mensagem: 'Cliente atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao editar cliente', errorMessage: error.message });
    }
  },

  
  deletarCliente: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'ID do cliente é obrigatório' });
      }

      const cliente = await clienteModel.buscarPorId(id);
      if (cliente.length === 0) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      await clienteModel.deletarCliente(id);
      res.status(200).json({ mensagem: 'Cliente deletado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao deletar cliente', errorMessage: error.message });
    }
  }

};

module.exports = { clienteController };

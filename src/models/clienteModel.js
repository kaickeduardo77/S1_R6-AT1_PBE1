const pool = require('../config/db');

const clienteModel = {

  selecionarTodos: async () => {
    const sql = 'SELECT * FROM clientes;';
    const [rows] = await pool.query(sql);
    return rows;
  },

 
  inserirCliente: async (nome_cliente, cpf) => {
    const sql = 'INSERT INTO clientes (nome_cliente, cpf) VALUES (?, ?);';
    const values = [nome_cliente, cpf];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

 
  buscarCpf: async (cpf) => {
    const sql = 'SELECT * FROM clientes WHERE cpf = ?;';
    const [rows] = await pool.query(sql, [cpf]);
    return rows;
  },

 
  buscarPorId: async (id) => {
    const sql = 'SELECT * FROM clientes WHERE id_cliente = ?;';
    const [rows] = await pool.query(sql, [id]);
    return rows;
  },

  
  atualizarCliente: async (id, nome_cliente, cpf) => {
    const sql = 'UPDATE clientes SET nome_cliente = ?, cpf = ? WHERE id_cliente = ?;';
    const values = [nome_cliente, cpf, id];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  
  deletarCliente: async (id) => {
    const sql = 'DELETE FROM clientes WHERE id_cliente = ?;';
    const [rows] = await pool.query(sql, [id]);
    return rows;
  }
};

module.exports = clienteModel;

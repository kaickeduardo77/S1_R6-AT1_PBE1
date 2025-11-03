const pool = require('../config/db');

const clienteModel = {
    selecionarTodos: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    inserirCliente: async (nome_Cliente, cpf) => {
        const sql = 'INSERT INTO clientes (nome_Cliente , cpf ) VALUES (?, ?);';
        const values = [nome_Cliente, cpf];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

        buscarCpf: async (cpf)=>{
            const sql = 'SELECT * FROM clientes WHERE cpf = ?;';
            const[rows] = await pool.query(sql,cpf);
            return rows;
        }
};

module.exports = { clienteModel };

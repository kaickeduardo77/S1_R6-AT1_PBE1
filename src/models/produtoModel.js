const pool = require('../config/db');

const produtoModel = {
    /**
     * Seleciona todos os produtos do banco de dados.
     * @async
     * @function selecionarTodos
     * @returns {Promise<Array<object>>} Array de produtos.
     * 
     * @example
     * const produtos = await produtoModel.selecionarTodos();
     * console.log(produtos);
     * // Saída esperada:
     * // [
     * //   { id_produto: 1, descricao: 'Teclado', valor: 150.00 },
     * //   { id_produto: 2, descricao: 'Mouse', valor: 399.99 }
     * // ]
     */
    selecionarTodos: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    /**
     * Seleciona um produto específico pelo ID.
     * @async
     * @function selecionarPorId
     * @param {number} pID - Identificador do produto.
     * @returns {Promise<Array<object>>} Produto encontrado.
     * 
     * @example
     * const produto = await produtoModel.selecionarPorId(1);
     * console.log(produto);
     * // Saída esperada:
     * // [{ id_produto: 1, descricao: 'Teclado', valor: 150.00 }]
     */
    selecionarPorId: async (pID) => {
        const sql = 'SELECT * FROM produtos WHERE id_produto = ?;';
        const values = [pID];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * Insere um novo produto no banco de dados.
     * @async
     * @function inserirProduto
     * @param {string} pDescriçao - Descrição do produto.
     * @param {number} pValor - Valor do produto.
     * @returns {Promise<object>} Resultado da operação.
     * 
     * @example
     * const resultado = await produtoModel.inserirProduto('Produto teste', 16.99);
     * console.log(resultado);
     */
    inserirProduto: async (pDescriçao, pValor) => {
        const sql = 'INSERT INTO produtos (descriçao, valor) VALUES (?, ?);';
        const values = [pDescriçao, pValor];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * Atualiza as informações de um produto existente.
     * @async
     * @function alterarProduto
     * @param {number} pID - ID do produto a ser atualizado.
     * @param {string} pDescriçao - Nova descrição do produto.
     * @param {number} pValor - Novo valor do produto.
     * @returns {Promise<object>} Resultado da operação.
     * 
     * @example
     * const resultado = await produtoModel.alterarProduto(1, 'Teclado Gamer', 250.00);
     * console.log(resultado);
     */
    alterarProduto: async (pID, pDescriçao, pValor) => {
        const sql = 'UPDATE produtos SET descriçao = ?, valor = ? WHERE id_produto = ?;';
        const values = [pDescriçao, pValor, pID];
        const [rows] = await pool.query(sql, values);
        return rows;
    },



         deleteProduto: async(pID)=> {
         const sql ="DELETE FROM produtos WHERE id_produto = ?;";
         const values = [pID]
         const [rows] = await pool.query(sql, values);
         return rows;
    }
}

module.exports = { produtoModel };

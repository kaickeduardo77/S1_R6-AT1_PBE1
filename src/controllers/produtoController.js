const { produtoModel } = require('../models/produtoModel');

const produtoController = {
    /**
     * retorna os produtos cadastrdos no banco de dados
     * Rota: GET /produtos
     * @async
     * @function buscarTodosProdutos
     * @param {*} res Objeto da requisição HTTP
     * @param {*} _req Objeto da resposta HTTP
     * @returns {Promise<Array<objeto>>} Conteúdo com os dados da requisição
     */
    buscarTodosProdutos: async (req, res) => {
        try {
            const resultado = await produtoModel.selecionarTodos();
            if (resultado.length === 0) {
                return res.status(200).json({ message: 'A tabela selecionada não contém dados' });
            }
            res.status(200).json({ message: 'Resultado dos dados listados', data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.Message });

        }
    },

    /**
         * retorna os produtos cadastrdos no banco de dados
         * Rota: GET /produtos
         * @async
         * @function buscarProdutoPorId
         * @param {Request} res Objeto da requisição HTTP
         * @param {Response} req Objeto da resposta HTTP
         * @returns {Promise<Array<object>>} Conteúdo com os dados da requisição
         */

    buscarProdutoPorId: async (req, res) => {
        try {
            const id = Number(req.params.idProduto);
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'inForme um indentificador com (ID) valido' });

            }
            const resultado = await produtoModel.selecionarPorId(id)

            res.status(200).json({ message: 'Resultado dos dados listados', data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'ocorre um erro no servidor.', errorMessage: error.message });
        }
    },
    /**
        * cria um novo item na base de daods
        * 
        * @async
        * 
        * @param {Request} res Objeto da requisição HTTP
        * @param {Response} req Objeto da resposta HTTP
        * @function incluirProduto
        * @returns {Promise<Object>} Retorna objeto contento as informaçoes sobre o resultado do insert
        */


    incluirProduto: async (req, res) => {
        try {
            const { descricao, valor } = req.body;

            if (!String(descricao) || descricao.length < 3 || valor <= 0) {
                return res.status(400).json({ message: ' Dados invalidos' });

            }
            const resultado = await produtoModel.inserirProduto(descricao, valor);

            if (resultado.affectedRows === 1 && resultado.insertId != 0) {
                res.status(201).json({ message: ' Registro incluído com sucesso', result: resultado });
            } else {
                throw new Error('Ocorreu um ao incluir o registro');

            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'ocorre um erro no servidor.', errorMessage: error.message });
        }
    },

    atualizarProduto: async (req, res) => {
        try {

            const idProduto = Number(req.params.idProduto);
            const { descricao, valor } = req.body;

            if (!idProduto || !descricao || !valor || typeof idProduto !== 'number' ||
                !isNaN(descricao) || isNaN(valor) || descricao.trim().length < 3) {
                return res.status(400).json({ message: 'Verefique os dados enviados e tente novamente' })
            }

            const produtoAtual = await produtoModel.selecionarPorId(idProduto);
            if (produtoAtual.length === 0) {
                throw new error('Registro nao localizado')
            }
            const novaDescricao = descricao ?? produtoAtual[0].descricao;
            const novoValor = valor ?? produtoAtual[0].valor;

            const resultado = await produtoModel.alterarProduto(idProduto, novaDescricao, novoValor)

            if (resultado.changedRows === 0) {
                throw new Error(' ocorreu um erro  ao atualizar o produto')
            }
            res.status(200).json({ message: 'Registro atualizado com sucesso.', data: resultado });


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'ocorre um erro no servidor.', errorMessage: error.message });

        }
    },


    excluirProduto: async (req, res) => {
        try {
            const id = Number(req.params.idProduto);
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'Forneça um id valido ' });
            }
            const produtoSelecionado = await produtoModel.selecionarPorId(id);
            console.log(id);
            if (produtoSelecionado.length === 0) {
                throw new Error('Registro não localizado');

            } else {
                const resultado = await produtoModel.deleteProduto(id);
                if (resultado.affectedRows === 1) {
                    res.status(200).json({ message: 'Produto excluido com sucesso ', data: resultado });

                } else {
                    throw new Error('nao foi possivel excluir o produto ');
                }
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'ocorre um erro no servidor.', errorMessage: error.message });
        }
    }

};




module.exports = { produtoController };
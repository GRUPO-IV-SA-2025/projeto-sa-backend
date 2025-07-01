const db = require('../src/db');

class CadastrarProduto {

    async validarProduto(produto) {
        if (!produto.descricao || typeof produto.descricao !== 'string') {
            throw new Error('Descrição é obrigatório.')
        }
        if (!produto.categorias_id) {
            throw new Error('Categoria é obrigatório.')
        }
        return true;
    }

    async adicionarProduto(produto) {
        await this.validarProduto(produto)
        await db.query('INSERT INTO produtos (descricao, categorias_id) VALUES (?, ?)',
            [produto.descricao, produto.categorias_id]);
    }

    async listarProduto(descricao) {
        const [rows] = await db.query(
            'SELECT * FROM produtos WHERE descricao = ?', 
            [descricao]
        );
        return rows;
    }
}

module.exports = CadastrarProduto;
const db = require('../src/db');

class CadastrarCategoria {
    // constructor() {
    //     this.categorias = []
    // }


    async validarCategoria(categoria) {
        if (!categoria.descricao || typeof categoria.descricao !== 'string') {
            throw new Error('Descrição é obrigatório.')
        }
        return true;
    }

    async adicionarCategoria(categoria) {
        await this.validarCategoria(categoria)
        // await this.categorias.push(categoria)
        await db.query('INSERT INTO categorias (descricao) VALUES (?)', [categoria.descricao]);
    }

    async listarCategoria(descricao) {
        const [rows] = await db.query('SELECT * FROM categorias WHERE descricao = ?', [descricao]);
        // return this.categorias
        return rows;
    }
}

module.exports = CadastrarCategoria;
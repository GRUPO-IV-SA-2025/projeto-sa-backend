// const db = require('../src/db');
const db = require('../src/db')
const bcrypt = require('bcrypt');

class CadastroUsuario {
    // constructor() {
    //     this.usuarios = [];
    // }

    validarDados(usuario) {
        if (!usuario.nome || typeof usuario.nome !== 'string') {
            throw new Error('Nome é obrigatório e deve ser uma string.');
        }
        if (!usuario.sobrenome || typeof usuario.sobrenome !== 'string') {
            throw new Error('Sobrenome é obrigatório e deve ser uma string.');
        }
        if (!usuario.empresa || typeof usuario.empresa !== 'string') {
            throw new Error('Empresa é obrigatório e deve ser uma string.');
        }
        if (!usuario.contato 
            // || typeof usuario.contato !== 'number'
        ) {
            throw new Error('Contato é obrigatório.');
        }
        if (!usuario.email || typeof usuario.email !== 'string' || !usuario.email.includes('@')) {
            throw new Error('Email inválido.');
        }
        if (!usuario.senha) {
            throw new Error('Senha é obrigatória.');
        }
        return true;
    }

    async adicionarCadastro(usuario) {
         this.validarDados(usuario);

        // Verifica se o e-mail já existe
        const [usuariosExistentes] = await db.query(
            'SELECT id FROM usuarios WHERE email = ?',
            [usuario.email]
        );

        if (usuariosExistentes.length > 0) {
            throw new Error('Email já cadastrado.');
        }

        const senhaHash = await bcrypt.hash(usuario.senha, 10);

        const [result] = await db.query(
            `INSERT INTO usuarios (nome, sobrenome, empresa, contato, email, senha)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                usuario.nome,
                usuario.sobrenome,
                usuario.empresa,
                usuario.contato,
                usuario.email,
                senhaHash
            ]
        );

        return {
            id: result.insertId,
            nome: usuario.nome,
            email: usuario.email
        };
    }

    async listarCadastro() {
        const [usuarios] = await db.query('SELECT id, nome, email FROM usuarios');
        return usuarios;
    }


    // adicionarCadastro(usuario){
    //     this.validarDados(usuario)
    //     this.usuarios.push(usuario)
    // }

    // listarCadastro() {
    //     return this.usuarios
    // }
}

module.exports = CadastroUsuario;

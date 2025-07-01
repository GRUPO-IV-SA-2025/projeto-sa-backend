class Usuario {
    constructor(nome, sobrenome, empresa, contato, email, senha) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.empresa = empresa;
        this.contato = contato;
        this.email = email;
        this.senha = senha;
    }
}

let usuariosDB = [];  // Banco de dados fake em memória

const cadastrarUsuario = (usuario) => {
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

    usuariosDB.push(usuario);
    return usuario;
};

const listarUsuarios = () => usuariosDB;

module.exports = { Usuario, cadastrarUsuario, listarUsuarios };
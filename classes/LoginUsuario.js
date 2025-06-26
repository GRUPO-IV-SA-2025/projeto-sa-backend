class LoginUsuario {
    constructor() {
        this.usuarios = [];
    }

    validarDados(usuario) {
        if (!usuario.email || typeof usuario.email !== 'string' || !usuario.email.includes('@')) {
            throw new Error('Email inválido.');
        }

        if (!usuario.senha 
            // || usuario.senha.length < 6
        ) {
            throw new Error('Senha é obrigatória.');
        }
    }

    adicionarUsuario(usuario) {
        this.validarDados(usuario);
        this.usuarios.push(usuario)
    }

    listarUsuarios() {
        return this.usuarios
    }

    // buscarPorEmail(email) {
    //     return this.usuarios.find(u => u.email === email);
    // }
}

module.exports = LoginUsuario;

class Usuario {
    constructor(nome, sobrenome, empresa, contato, email, senha) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.empresa = empresa;
        this.contato = contato;
        this.email = email;
        this.senha = senha;
    }

    toLogin() {
        if (!this.email || this.email.trim() === '') {
            throw new Error("Email inválido");
        }

        if (!this.senha || this.senha.trim() === '') {
            throw new Error("Senha é obrigatória.");
        }

        return {
            email: this.email,
            senha: this.senha
        };
    }
}

module.exports = Usuario;

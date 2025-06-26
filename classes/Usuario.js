class Usuario {
    constructor(nome, sobrenome, empresa, contato, email, senha) {
        this.nome = nome
        this.sobrenome = sobrenome
        this.empresa = empresa
        this.contato = contato
        this.email = email
        this.senha = senha
    }

    toLogin() {
        return {
            email: this.email,
            senha: this.senha
        }
    }

}

module.exports = Usuario;
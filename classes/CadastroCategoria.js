class CadastrarCategoria {
    constructor() {
        this.categorias = []
    }

    validarCategoria(categoria){
        if(!categoria.descricao || typeof categoria.descricao !== 'string'){
            throw new Error('Descrição é obrigatório.')
        }
        return true;
    }

    adicionarCategoria(categoria){
        this.validarCategoria(categoria)
        this.categorias.push(categoria)
    }

    listarCategoria(){
        return this.categorias
    }
}

module.exports = CadastrarCategoria;
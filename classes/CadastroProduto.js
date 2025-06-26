class CadastrarProduto {
    constructor() {
        this.produtos = []
    }

    validarProduto(produto) {
        if (!produto.descricao || typeof produto.descricao !== 'string') {
            throw new Error('Descrição é obrigatório.')
        }
        if (!produto.categorias_id) {
            throw new Error('Categoria é obrigatório.')
        }
        return true;
    }

    adicionarProduto(produto){
        this.validarProduto(produto)
        this.produtos.push(produto)
    }

    listarProduto(){
        return this.produtos
    }
}

module.exports = CadastrarProduto;
class CadastrarEstoque {
    constructor() {
        this.estoques = []
    }

    validarEstoque(estoque) {
        if (!estoque.tipo || !['entrada', 'saida'].includes(estoque.tipo)) {
            throw new Error('Tipo é obrigatório.')
        }
        if (!estoque.quantidade || typeof estoque.quantidade !== 'number') {
            throw new Error('Quantidade é obrigatório.')
        }
        if (!estoque.preco_compra || typeof estoque.preco_compra !== 'number') {
            throw new Error('Preço é obrigatório.')
        }
        if (!estoque.produtos_id || typeof estoque.produtos_id !== 'number') {
            throw new Error('Produto é obrigatório.')
        }
    }

    adicionarEstoque(estoque) {
        this.validarEstoque(estoque)
        this.estoques.push(estoque)
    }

    listarEstoque() {
        return this.estoques
    }

    listarEstoquePorProduto(produtoId) {
        return this.estoques.filter(e => e.produtos_id === produtoId);
    }
}

module.exports = CadastrarEstoque;
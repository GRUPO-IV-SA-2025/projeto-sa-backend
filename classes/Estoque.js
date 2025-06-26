class Estoque {
    constructor(tipo, quantidade, preco_compra, produtos_id, data_lancamento = new Date().toISOString().split('T')[0]) {
        this.tipo = tipo; // 'entrada' ou 'saida'
        this.quantidade = quantidade;
        this.preco_compra = preco_compra;
        this.produtos_id = produtos_id;
        // this.data_lancamento = data_lancamento; 
    }
}

module.exports = Estoque;

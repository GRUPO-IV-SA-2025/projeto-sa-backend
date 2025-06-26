const CadastrarProduto = require("../classes/CadastroProduto");
const Produto = require("../classes/Produto");


describe('Teste de cadastro Produto', () => {
    test('Cadastro Produto', () => {
        //GIVEN - DADOS
        const cadastrarProduto = new CadastrarProduto();
        const produto = new Produto(
            'Geladeira Brastemp',
            '1'
        ) 

        //WHEN - ACAO
        cadastrarProduto.adicionarProduto(produto)

        //THEN - RESULTADO
        const lista = cadastrarProduto.listarProduto()
        expect(lista.length).toBe(1)
        console.log(lista);
    })
        test('Cadastro descricao vazia', () => {
        //GIVEN - DADOS
        const cadastrarProduto = new CadastrarProduto();
        const produto = new Produto(
            '',
            '1'
        ) 

        //WHEN - ACAO
        expect(() => {

            cadastrarProduto.adicionarProduto(produto).toThrow(
                'Descrição é obrigatório.'
            )
        })

        //THEN - RESULTADO
        const lista = cadastrarProduto.listarProduto()
        expect(lista.length).toBe(0)
    })
        test('Cadastro categoria vazia', () => {
        //GIVEN - DADOS
        const cadastrarProduto = new CadastrarProduto();
        const produto = new Produto(
            'Geladeira Brastemp',
            ''
        ) 

        //WHEN - ACAO
        expect(() => {

            cadastrarProduto.adicionarProduto(produto).toThrow(
                'Categoria é obrigatório.'
            )
        })

        //THEN - RESULTADO
        const lista = cadastrarProduto.listarProduto()
        expect(lista.length).toBe(0)
    })
    
    
})
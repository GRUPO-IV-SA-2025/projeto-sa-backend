const CadastrarCategoria = require("../classes/CadastroCategoria");
const Categoria = require("../classes/Categoria");

describe('Teste de cadastro Categoria', () => {
    test('Cadastro categoria', () => {
        //GIVEN - DADOS
        const cadastrarCategoria = new CadastrarCategoria();
        const categoria = new Categoria(
            'Eletrodoméstico'
        )

        //WHEN - ACAO
        cadastrarCategoria.adicionarCategoria(categoria)

        //THEN - RESULTADO
        const lista = cadastrarCategoria.listarCategoria()
        expect(lista.length).toBe(1)
        console.log(lista);
        
    })
    test('Cadastro categoria vazia', () => {
        //GIVEN - DADOS
        const cadastrarCategoria = new CadastrarCategoria();
        const categoria = new Categoria(
            ''
        )

        //WHEN - ACAO
        expect(() => {

            cadastrarCategoria.adicionarCategoria(categoria).toThrow(
                'Descrição é obrigatório.'
            )
        })

        //THEN - RESULTADO
        const lista = cadastrarCategoria.listarCategoria()
        expect(lista.length).toBe(0)        
    })
})
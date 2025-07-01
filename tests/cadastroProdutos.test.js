const CadastrarProduto = require("../classes/CadastroProduto");
const Produto = require("../classes/Produto");
const db = require("../src/db");

describe('Teste de cadastro Produto', () => {

    // beforeAll(async () => {
    //     // await db.query('DELETE FROM produtos WHERE descricao = ?', ['Geladeira Brastemp']);

    //     // // Garante que categoria exista
    //     // const [rows] = await db.query('SELECT id FROM categorias WHERE descricao = ?', ['Eletrodoméstico']);
    //     // if (rows.length === 0) {
    //     //     await db.query('INSERT INTO categorias (descricao) VALUES (?)', ['Eletrodoméstico']);
    //     // }

    // });

    beforeAll(async () => {
        // Garante que categoria exista
        const [rows] = await db.query('SELECT id FROM categorias WHERE descricao = ?', ['Eletrodoméstico']);
        if (rows.length === 0) {
            await db.query('INSERT INTO categorias (descricao) VALUES (?)', ['Eletrodoméstico']);
        }
    });

    beforeEach(async () => {
        await db.query('DELETE FROM produtos WHERE descricao = ?', ['Geladeira Brastemp']);
    });



    test('Cadastro Produto válido', async () => {
        //GIVEN - DADOS
        const cadastrarProduto = new CadastrarProduto();

        const [categorias] = await db.query('SELECT id FROM categorias WHERE descricao = ?', ['Eletrodoméstico']);
        const categoriaId = categorias[0].id;

        const produto = new Produto('Geladeira Brastemp', categoriaId.toString());

        //WHEN - ACAO
        await cadastrarProduto.adicionarProduto(produto)

        //THEN - RESULTADO
        const lista = await cadastrarProduto.listarProduto('Geladeira Brastemp');
        expect(lista.length).toBe(1);
        console.log(lista);
    });

    test('Cadastro descricao vazia', async () => {
        //GIVEN - DADOS
        const cadastrarProduto = new CadastrarProduto();
        const produto = new Produto('', '1')

        //WHEN - ACAO
        await expect(cadastrarProduto.adicionarProduto(produto))
            .rejects
            .toThrow(
                'Descrição é obrigatório.'
            )

        //THEN - RESULTADO
        const lista = await cadastrarProduto.listarProduto()
        expect(lista.length).toBe(0)
    });

    test('Cadastro categoria vazia', async () => {
        //GIVEN - DADOS
        const cadastrarProduto = new CadastrarProduto();
        const produto = new Produto(
            'Geladeira Brastemp',
            ''
        )

        //WHEN - ACAO
        await expect(cadastrarProduto.adicionarProduto(produto))
            .rejects
            .toThrow(
                'Categoria é obrigatório.'
            )

        //THEN - RESULTADO
        // const lista = cadastrarProduto.listarProduto()
        const lista = await cadastrarProduto.listarProduto('Geladeira Brastemp');
        expect(lista.length).toBe(0)
    });

    describe('Teste temporário', () => {
        it('Deve passar', () => {
            expect(true).toBe(true);
        });
    });

});


// })
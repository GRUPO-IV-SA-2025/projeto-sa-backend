

const CadastrarEstoque = require('../classes/CadastroEstoque');
const Estoque = require('../classes/Estoque');
const CadastrarProduto = require('../classes/CadastroProduto');
const Produto = require('../classes/Produto');
const db = require('../src/db');

describe('Teste de cadastro de Estoque', () => {
    let produtoId = 1

    beforeAll(async () => {
        const [catRows] = await db.query('SELECT id FROM categorias WHERE descricao = ?', ['Eletrodoméstico']);
        let categoriaId;

        if (catRows.length === 0) {
            const result = await db.query('INSERT INTO categorias (descricao) VALUES (?)', ['Eletrodoméstico']);
            categoriaId = result[0].insertId;
        } else {
            categoriaId = catRows[0].id;
        }

        const cadastrarProduto = new CadastrarProduto();
        const produto = new Produto('Geladeira Consul', categoriaId.toString());
        await cadastrarProduto.adicionarProduto(produto);

        const [prodRows] = await db.query('SELECT id FROM produtos WHERE descricao = ?', ['Geladeira Consul']);
        produtoId = prodRows[0].id;
    });

    beforeEach(async () => {
        await db.query('DELETE FROM estoque WHERE produtos_id = ?', [produtoId]);
    });

    test('Cadastro de estoque válido', async () => {
        const cadastrarEstoque = new CadastrarEstoque();
        const estoque = new Estoque('entrada', 10, 1500.00, produtoId);

        await cadastrarEstoque.adicionarEstoque(estoque);

        const lista = await cadastrarEstoque.listarEstoquePorProduto(produtoId);
        expect(lista.length).toBeGreaterThan(0);
        expect(lista[0].tipo).toBe('entrada');
        expect(lista[0].quantidade).toBe(10);
    });

    test('Cadastro com tipo vazio deve falhar', async () => {
        const cadastrarEstoque = new CadastrarEstoque();
        const estoque = {
            tipo: '',
            quantidade: 10,
            preco_compra: 100,
            produtos_id: 1
        };

        expect(() => {
            cadastrarEstoque.adicionarEstoque(estoque);
        }).toThrow('Tipo é obrigatório.');
        const lista = await cadastrarEstoque.listarEstoquePorProduto(produtoId);
        expect(lista.length).toBe(0);
    });



    test('Cadastro com quantidade inválida deve falhar', () => {
        const estoqueService = new CadastrarEstoque();

        const estoqueInvalido = {
            tipo: 'entrada',
            quantidade: 'dez',
            preco_compra: 10.5,
            produtos_id: 1
        };

        expect(() => {
            estoqueService.adicionarEstoque(estoqueInvalido);
        }).toThrow('Quantidade é obrigatório.');
    })

    test('Cadastro com preço vazio deve falhar', async () => {
        const cadastrarEstoque = new CadastrarEstoque();
        const estoque = new Estoque('entrada', 5, 'dez', 1);

        expect(() => cadastrarEstoque.adicionarEstoque(estoque)
        ).toThrow('Preço é obrigatório.');
    });

    test('Cadastro com produto inválido deve falhar', async () => {
        const cadastrarEstoque = new CadastrarEstoque();
        const estoque = new Estoque('entrada', 5, 1000, '');

         expect(() => cadastrarEstoque.adicionarEstoque(estoque)).toThrow('Produto é obrigatório.');

        const lista = await cadastrarEstoque.listarEstoque();
        expect(lista.find(e => e.produtos_id === '')).toBeUndefined();
    });

});
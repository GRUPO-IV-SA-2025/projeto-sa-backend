const CadastrarCategoria = require("../classes/CadastroCategoria");
const Categoria = require("../classes/Categoria");
const db = require("../src/db");

describe('Teste de cadastro Categoria', () => {

    // beforeAll(async () => {
    //     await db.query('DELETE FROM categorias WHERE descricao = ?', ['Eletrodoméstico']);
    // });

    beforeAll(async () => {
    // Apaga produtos vinculados antes da categoria
    await db.query(`
      DELETE p FROM produtos p
      JOIN categorias c ON p.categorias_id = c.id
      WHERE c.descricao = ?`, ['Eletrodoméstico']);

    await db.query('DELETE FROM categorias WHERE descricao = ?', ['Eletrodoméstico']);
  });

    test('Cadastro categoria', async () => {
        //GIVEN - DADOS
        const cadastrarCategoria = new CadastrarCategoria();
        const categoria = new Categoria('Eletrodoméstico')

        //WHEN - ACAO
        await cadastrarCategoria.adicionarCategoria(categoria)

        //THEN - RESULTADO
        const lista = await cadastrarCategoria.listarCategoria('Eletrodoméstico')
        expect(lista.length).toBe(1)
        console.log(lista);

    })
    test('Cadastro categoria vazia', async () => {
        //GIVEN - DADOS
        const cadastrarCategoria = new CadastrarCategoria();
        const categoria = new Categoria('')

        //WHEN - ACAO
        // await expect(() => {

        //     cadastrarCategoria.adicionarCategoria(categoria).toThrow(
        //         'Descrição é obrigatório.'
        //     )
        // })
        await expect(cadastrarCategoria.adicionarCategoria(categoria))
            .rejects
            .toThrow('Descrição é obrigatório.');

        //THEN - RESULTADO
        const lista = await cadastrarCategoria.listarCategoria('')
        expect(lista.length).toBe(0)
    })
})
// const CadastrarEstoque = require("../classes/CadastroEstoque");
// const Estoque = require("../classes/Estoque");


// describe('Teste de cadastro Estoque', () => {
//     test('Cadastr estoque', () => {
//         //GIVEN - DADOS
//         const cadastrarEstoque = new CadastrarEstoque();
//         const estoque = new Estoque(
//             'Entrada',
//             2,
//             120,
//             1
//         )

//         //WHEN - ACAO
//         cadastrarEstoque.adicionarEstoque(estoque)

//         //THEN - RESULTADO
//         const lista = cadastrarEstoque.listarEstoque()
//         expect(lista.length).toBe(1)
//         console.log(lista);
//     })
//     test('Cadastr estoque - entrada vazia', () => {
//         //GIVEN - DADOS
//         const cadastrarEstoque = new CadastrarEstoque();
//         const estoque = new Estoque(
//             '',
//             2,
//             120,
//             1
//         )

//         //WHEN - ACAO
//         expect(() => {

//             cadastrarEstoque.adicionarEstoque(estoque).toThrow(
//                 'Tipo é obrigatório.'
//             )
//         })

//         //THEN - RESULTADO
//         const lista = cadastrarEstoque.listarEstoque()
//         expect(lista.length).toBe(0)
//     })
//     test('Cadastr estoque - quantidade vazia', () => {
//         //GIVEN - DADOS
//         const cadastrarEstoque = new CadastrarEstoque();
//         const estoque = new Estoque(
//             'Entrada',
//             2,
//             120,
//             1
//         )

//         //WHEN - ACAO
//         expect(() => {

//             cadastrarEstoque.adicionarEstoque(estoque).toThrow(
//                 'Quantidade é obrigatório.'
//             )
//         })

//         //THEN - RESULTADO
//         const lista = cadastrarEstoque.listarEstoque()
//         expect(lista.length).toBe(0)
//     })

//     test('Cadastr estoque - entrada vazia', () => {
//         //GIVEN - DADOS
//         const cadastrarEstoque = new CadastrarEstoque();
//         const estoque = new Estoque(
//             'Entrada',
//             2,
//             '',
//             1
//         )

//         //WHEN - ACAO
//         expect(() => {

//             cadastrarEstoque.adicionarEstoque(estoque).toThrow(
//                 'Preço é obrigatório.'
//             )
//         })

//         //THEN - RESULTADO
//         const lista = cadastrarEstoque.listarEstoque()
//         expect(lista.length).toBe(0)
//     })
//     test('Cadastr estoque - produto vazio', () => {
//         //GIVEN - DADOS
//         const cadastrarEstoque = new CadastrarEstoque();
//         const estoque = new Estoque(
//             'Entrada',
//             2,
//             120,
//             ''
//         )

//         //WHEN - ACAO
//         expect(() => {

//             cadastrarEstoque.adicionarEstoque(estoque).toThrow(
//                 'Produto é obrigatório.'
//             )
//         })

//         //THEN - RESULTADO
//         const lista = cadastrarEstoque.listarEstoque()
//         expect(lista.length).toBe(0)
//     })
// })

// describe('Teste temporário', () => {
//   it('Deve passar', () => {
//     expect(true).toBe(true);
//   });
// });
// const LoginUsuario = require('../classes/LoginUsuario')
// const Usuario = require('../classes/Usuario')

// describe('Teste de Login Usuário', () => {

//     test('Logar usuário', () => {
//         //GIVEN - DADOS
//         const login = new LoginUsuario();
//         const usuario = new Usuario(
//             'João',
//             'Silva',
//             'MinhaEmpresa',
//             '123456789',
//             'joao@example.com',
//             '123456'
//         )

//         //WHEN - ACAO
//         login.adicionarUsuario(usuario.toLogin())

//         //THEN - RESULTADO
//         const lista = login.listarUsuarios()
//         expect(lista.length).toBe(1)
//         console.log(lista);
//     })
//         test('Logar usuário com e-mail vazio', () => {
//         //GIVEN - DADOS
//         const login = new LoginUsuario();
//         const usuario = new Usuario(
//             'João',
//             'Silva',
//             'MinhaEmpresa',
//             '123456789',
//             '',
//             '123456'
//         )

//         //WHEN - ACAO
//         expect(() => {
//             login.adicionarUsuario(usuario.toLogin()).toThrow(
//                 'Email inválido'
//             )
//         })
        

//         //THEN - RESULTADO
//         const lista = login.listarUsuarios()
//         expect(lista.length).toBe(0)
//     })
//             test('Logar usuário com senha vazia', () => {
//         //GIVEN - DADOS
//         const login = new LoginUsuario();
//         const usuario = new Usuario(
//             'João',
//             'Silva',
//             'MinhaEmpresa',
//             '123456789',
//             'joao@example.com',
//             ''
//         )

//         //WHEN - ACAO
//         expect(() => {
//             login.adicionarUsuario(usuario.toLogin()).toThrow(
//                 'Senha é obrigatória.'
//             )
//         })
        
//         //THEN - RESULTADO
//         const lista = login.listarUsuarios()
//         expect(lista.length).toBe(0)
//     })
// })
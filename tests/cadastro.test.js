const CadastroUsuario = require('../classes/CadastroUsuario')
const Usuario = require('../classes/Usuario')
process.env.NODE_ENV = 'test';
const db = require('../src/db');
const { criarUsuario } = require('../models/usuario');


// beforeAll(async () => {
//     // Limpe ou resete o banco de testes
//     await db.query('DELETE FROM usuarios');
//   });

//   afterAll(async () => {
//     await db.end();
//   });


describe('Testes EstoquePlus', () => {
    const cadastro = new CadastroUsuario();


    beforeAll(async () => {
        await db.query('DELETE FROM usuarios WHERE email = ?', ['joao@example.com']);
    });

    //   afterAll(async () => {
    //     // Finaliza o pool de conexões DEPOIS de todos os testes
    //     await db.end();
    //   });


    test('Cadastrar usuário', async () => {

        //GIVEN - DADOS
        const usuario = new Usuario(
            'João',
            'Silva',
            'MinhaEmpresa',
            '123456789',
            'joao@example.com',
            '123456'
        )

        //WHEN - ACAO
        await cadastro.adicionarCadastro(usuario)

        //THEN - RESULTADO

        const lista = await cadastro.listarCadastro()
        expect(lista.length).toBe(1);
    });

    test('Cadastro de usuário com email inválido', async () => {
        const cadastro = new CadastroUsuario();
        const usuario = new Usuario(
            'Maria',
            'Souza',
            'Tech LTDA',
            '987654321',
            'mariaexample.com',
            'senha123'
        );

        // Espera que o cadastro lance um erro
        await expect(cadastro.adicionarCadastro(usuario))
            .rejects
            .toThrow('Email inválido.');

        // Confirma que não foi salvo no banco
        const [result] = await db.query('SELECT * FROM usuarios WHERE email = ?', ['mariaexample.com']);
        expect(result.length).toBe(0);
    });
    test('Cadastrar usuário sem nome', async () => {

        //GIVEN - DADOS
        const cadastro = new CadastroUsuario();
        const usuario = new Usuario(
            '',
            'Silva',
            'MinhaEmpresa',
            '123456789',
            'joao@example.com',
            '123456'
        )

        //WHEN - ACAO
        await expect(() =>
            cadastro.adicionarCadastro(usuario))
            .rejects
            .toThrow(
                'Nome é obrigatório e deve ser uma string.'
            )

        //THEN - RESULTADO

        // const lista = cadastro.listarCadastro()
        // expect(lista.length).toBe(0);
        const [result] = await db.query('SELECT * FROM usuarios WHERE email = ?', ['maria@exemplo.com']);
        expect(result.length).toBe(0);
    });
    // test('Cadastrar usuário sem sobrenome', async () => {

    //     //GIVEN - DADOS
    //     const cadastro = new CadastroUsuario();
    //     const usuario = new Usuario(
    //         'João',
    //         '',
    //         'MinhaEmpresa',
    //         '123456789',
    //         'joao@example.com',
    //         '123456'
    //     )

    //     //WHEN - ACAO
    //     expect (() => 
    //     cadastro.adicionarCadastro(usuario)).toThrow(
    //         'Sobrenome é obrigatório e deve ser uma string.'
    //     )

    //     //THEN - RESULTADO

    //     const lista = cadastro.listarCadastro()
    //     expect(lista.length).toBe(0);
    // });
    // test('Cadastrar usuário sem nome', async () => {

    //     //GIVEN - DADOS
    //     const cadastro = new CadastroUsuario();
    //     const usuario = new Usuario(
    //         'João',
    //         'Silva',
    //         '',
    //         '123456789',
    //         'joao@example.com',
    //         '123456'
    //     )

    //     //WHEN - ACAO
    //     expect (() => 
    //     cadastro.adicionarCadastro(usuario)).toThrow(
    //         'Empresa é obrigatório e deve ser uma string.'
    //     )

    //     //THEN - RESULTADO
    //     const lista = cadastro.listarCadastro()
    //     expect(lista.length).toBe(0);
    // });
    // test('Cadastrar usuário sem contato', async () => {

    //     //GIVEN - DADOS
    //     const cadastro = new CadastroUsuario();
    //     const usuario = new Usuario(
    //         'João',
    //         'Silva',
    //         'MinhaEmpresa',
    //         '',
    //         'joao@example.com',
    //         '123456'
    //     )

    //     //WHEN - ACAO
    //     expect (() => 
    //     cadastro.adicionarCadastro(usuario)).toThrow(
    //         'Contato é obrigatório.'
    //     )

    //     //THEN - RESULTADO

    //     const lista = cadastro.listarCadastro()
    //     expect(lista.length).toBe(0);
    // });
    // test('Cadastrar usuário sem e-mail', async () => {

    //     //GIVEN - DADOS
    //     const cadastro = new CadastroUsuario();
    //     const usuario = new Usuario(
    //         'João',
    //         'Silva',
    //         'MinhaEmpresa',
    //         '123456789',
    //         '',
    //         '123456'
    //     )

    //     //WHEN - ACAO
    //     expect (() => 
    //     cadastro.adicionarCadastro(usuario)).toThrow(
    //         'Email inválido.'
    //     )

    //     //THEN - RESULTADO

    //     const lista = cadastro.listarCadastro()
    //     expect(lista.length).toBe(0);
    // });
    // test('Cadastrar usuário sem @ no e-mail', async () => {

    //     //GIVEN - DADOS
    //     const cadastro = new CadastroUsuario();
    //     const usuario = new Usuario(
    //         'João',
    //         'Silva',
    //         'MinhaEmpresa',
    //         '123456789',
    //         'joao_example.com',
    //         '123456'
    //     )

    //     //WHEN - ACAO
    //     expect (() => 
    //     cadastro.adicionarCadastro(usuario)).toThrow(
    //         'Email inválido.'
    //     )

    //     //THEN - RESULTADO

    //     const lista = cadastro.listarCadastro()
    //     expect(lista.length).toBe(0);
    // });
    // test('Cadastrar usuário sem senha', async () => {

    //     //GIVEN - DADOS
    //     const cadastro = new CadastroUsuario();
    //     const usuario = new Usuario(
    //         'João',
    //         'Silva',
    //         'MinhaEmpresa',
    //         '123456789',
    //         'joao@example.com',
    //         ''
    //     )

    //     //WHEN - ACAO
    //     expect (() => 
    //     cadastro.adicionarCadastro(usuario)).toThrow(
    //         'Senha é obrigatória.'
    //     )

    //     //THEN - RESULTADO

    //     const lista = cadastro.listarCadastro()
    //     expect(lista.length).toBe(0);
    // });
});

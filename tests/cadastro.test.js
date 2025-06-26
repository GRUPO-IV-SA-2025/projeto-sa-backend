const CadastroUsuario = require('../classes/CadastroUsuario')
const Usuario = require('../classes/Usuario')

describe('Testes EstoquePlus', () => {

    test('Cadastrar usuário',  () => {

        //GIVEN - DADOS
        const cadastro = new CadastroUsuario();
        const usuario = new Usuario(
            'João',
            'Silva',
            'MinhaEmpresa',
            '123456789',
            'joao@example.com',
            '123456'
        )

        //WHEN - ACAO
        cadastro.adicionarCadastro(usuario)

        //THEN - RESULTADO

        const lista = cadastro.listarCadastro()
        expect(lista.length).toBe(1);
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
        expect (() => 
        cadastro.adicionarCadastro(usuario)).toThrow(
            'Nome é obrigatório e deve ser uma string.'
        )

        //THEN - RESULTADO

        const lista = cadastro.listarCadastro()
        expect(lista.length).toBe(0);
    });
    test('Cadastrar usuário sem sobrenome', async () => {

        //GIVEN - DADOS
        const cadastro = new CadastroUsuario();
        const usuario = new Usuario(
            'João',
            '',
            'MinhaEmpresa',
            '123456789',
            'joao@example.com',
            '123456'
        )

        //WHEN - ACAO
        expect (() => 
        cadastro.adicionarCadastro(usuario)).toThrow(
            'Sobrenome é obrigatório e deve ser uma string.'
        )

        //THEN - RESULTADO

        const lista = cadastro.listarCadastro()
        expect(lista.length).toBe(0);
    });
    test('Cadastrar usuário sem nome', async () => {

        //GIVEN - DADOS
        const cadastro = new CadastroUsuario();
        const usuario = new Usuario(
            'João',
            'Silva',
            '',
            '123456789',
            'joao@example.com',
            '123456'
        )

        //WHEN - ACAO
        expect (() => 
        cadastro.adicionarCadastro(usuario)).toThrow(
            'Empresa é obrigatório e deve ser uma string.'
        )

        //THEN - RESULTADO
        const lista = cadastro.listarCadastro()
        expect(lista.length).toBe(0);
    });
    test('Cadastrar usuário sem contato', async () => {

        //GIVEN - DADOS
        const cadastro = new CadastroUsuario();
        const usuario = new Usuario(
            'João',
            'Silva',
            'MinhaEmpresa',
            '',
            'joao@example.com',
            '123456'
        )

        //WHEN - ACAO
        expect (() => 
        cadastro.adicionarCadastro(usuario)).toThrow(
            'Contato é obrigatório.'
        )

        //THEN - RESULTADO

        const lista = cadastro.listarCadastro()
        expect(lista.length).toBe(0);
    });
    test('Cadastrar usuário sem e-mail', async () => {

        //GIVEN - DADOS
        const cadastro = new CadastroUsuario();
        const usuario = new Usuario(
            'João',
            'Silva',
            'MinhaEmpresa',
            '123456789',
            '',
            '123456'
        )

        //WHEN - ACAO
        expect (() => 
        cadastro.adicionarCadastro(usuario)).toThrow(
            'Email inválido.'
        )

        //THEN - RESULTADO

        const lista = cadastro.listarCadastro()
        expect(lista.length).toBe(0);
    });
    test('Cadastrar usuário sem @ no e-mail', async () => {

        //GIVEN - DADOS
        const cadastro = new CadastroUsuario();
        const usuario = new Usuario(
            'João',
            'Silva',
            'MinhaEmpresa',
            '123456789',
            'joao_example.com',
            '123456'
        )

        //WHEN - ACAO
        expect (() => 
        cadastro.adicionarCadastro(usuario)).toThrow(
            'Email inválido.'
        )

        //THEN - RESULTADO

        const lista = cadastro.listarCadastro()
        expect(lista.length).toBe(0);
    });
    test('Cadastrar usuário sem senha', async () => {

        //GIVEN - DADOS
        const cadastro = new CadastroUsuario();
        const usuario = new Usuario(
            'João',
            'Silva',
            'MinhaEmpresa',
            '123456789',
            'joao@example.com',
            ''
        )

        //WHEN - ACAO
        expect (() => 
        cadastro.adicionarCadastro(usuario)).toThrow(
            'Senha é obrigatória.'
        )

        //THEN - RESULTADO

        const lista = cadastro.listarCadastro()
        expect(lista.length).toBe(0);
    });
});

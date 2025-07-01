const LoginUsuario = require('../classes/LoginUsuario');
const Usuario = require('../classes/Usuario');

describe('Teste de Login Usuário', () => {

    test('Logar usuário com sucesso', () => {
        // GIVEN
        const login = new LoginUsuario();
        const usuario = new Usuario(
            'João',
            'Silva',
            'MinhaEmpresa',
            '123456789',
            'joao@example.com',
            '123456'
        );

        // WHEN
        login.adicionarUsuario(usuario.toLogin());

        // THEN
        const lista = login.listarUsuarios();
        expect(lista.length).toBe(1);
        expect(lista[0].email).toBe('joao@example.com');
    });

    test('Erro ao logar com e-mail vazio', () => {
        const login = new LoginUsuario();
        const usuario = new Usuario(
            'João',
            'Silva',
            'MinhaEmpresa',
            '123456789',
            '',
            '123456'
        );

        expect(() => {
            login.adicionarUsuario(usuario.toLogin());
        }).toThrow('Email inválido');
    });

    test('Erro ao logar com senha vazia', () => {
        const login = new LoginUsuario();
        const usuario = new Usuario(
            'João',
            'Silva',
            'MinhaEmpresa',
            '123456789',
            'joao@example.com',
            ''
        );

        expect(() => {
            login.adicionarUsuario(usuario.toLogin());
        }).toThrow('Senha é obrigatória.');
    });
});

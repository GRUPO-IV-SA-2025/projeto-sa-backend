const { Usuario, cadastrarUsuario, listarUsuarios } = require('../models/usuario');  // Certifique-se que está exportando corretamente

const cadastrar = (req, res) => {
    const { nome, sobrenome, empresa, contato, email, senha } = req.body;

    if (!nome || !sobrenome || !empresa || !contato || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    if (!email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ message: 'Email inválido.' });
    }

    try {
        const usuario = cadastrarUsuario(new Usuario(nome, sobrenome, empresa, contato, email, senha));
        return res.status(201).json(usuario);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const listar = (req, res) => {
    const usuarios = listarUsuarios();
    return res.status(200).json({ usuarios });
};

module.exports = { cadastrar, listar };
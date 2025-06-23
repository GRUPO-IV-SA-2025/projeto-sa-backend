import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Conexão bd mysql
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'senai',
    database: 'estoqueplus',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({
            message: 'Token inválido ou expirado.'
        });
        req.user = user;
        next();
    });
}

// Login Usuário
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({
                message: 'Usuário não encontrado.'
            });
        }
        const usuario = rows[0];

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({
                message: 'Credenciais inválidas'
            })
        }
        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome, email: usuario.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Erro ao autenticar:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
})

// GET usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err.message);
    }
})

// GET somente um usuario pelo id
app.get('/usuarios/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        if (Number(id) !== Number(req.user.id)) {
            return res.status(403).json({
                message: 'Acesso não autorizado'
            });
        }

        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Usuário não encontrado'
            });
        }

        const { senha, ...usuario } = rows[0];
        res.json(usuario);

    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({
            message: 'Erro interno no servidor'
        });
    }
})

app.patch('/usuarios/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, empresa, contato, email } = req.body;

    try {
        if (Number(id) !== Number(req.user.id)) {
            return res.status(403).json({ message: 'Acesso não autorizado.' })
        }

        await pool.query(
            'UPDATE usuarios SET nome = ?, sobrenome = ?, empresa = ?, contato = ?, email = ? WHERE id = ?',
            [nome, sobrenome, empresa, contato, email, id]);

        const [atualzado] = await pool.query('SELECT * FROM usuarios  WHERE id = ?', [id]);
        const { senha, ...usuario } = atualzado[0];
        res.json(usuario);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erro ao atualizar perfil.' });
    }
})

app.delete('/usuarios/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        if (Number(id) !== Number(req.user.id)) {
            return res.status(403).json({ message: 'Acesso não autorizado.' });
        }

        await pool.query('DELETE FROM usuarios where id = ?', [id]);
        res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erro ao excluir a conta.' });
    }
})

//Cadastro de usuário
app.post('/cadastro', async (req, res) => {
    const { nome, sobrenome, empresa, contato, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: 'Email já cadastrado.' });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        await pool.query(
            'INSERT INTO usuarios (nome, sobrenome, empresa, contato, email, senha) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, sobrenome, empresa, contato, email, senhaHash]);

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' })
    }
})

app.get('/public', (req, res) => {
    res.send('Rota pública acessada com sucesso!');
})

app.get('/private', authenticateToken, (req, res) => {
    res.send(`Olá, ${req.user.nome}! Você acessou uma rota protegida.`);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})

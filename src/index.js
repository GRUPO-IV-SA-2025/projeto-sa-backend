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
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token não fornecido.' })

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido ou expirado.' });

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

// CRUD Usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.patch('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    
    try {
        const [result] = await pool.query(
            'UPDATE teste SET nome = ?, email = ? WHERE id = ?',
            [nome, email, id]);
        const [atualzado] = await pool.query('SELECT * FROM teste WHERE id = ?', [id]);
        console.log(result);
        res.json(atualzado[0]);
    } catch (err) {
        console.error(err.message)
    }
})

app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM usuarios where id = ?', [id]);
        res.json(result);
    } catch (err) {
        console.error(err.message);
    }
})

//Cadastro de usuário
app.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: 'Email já cadastrado.' });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senhaHash]);

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

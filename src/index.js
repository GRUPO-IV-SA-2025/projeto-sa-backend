import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



// Conexão bd mysql
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ian123',
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
    const {
        nome, sobrenome, empresa, contato, email,
        cep, logradouro, numero, complemento, bairro, cidade, uf
    } = req.body;

    try {
        if (Number(id) !== Number(req.user.id)) {
            return res.status(403).json({ message: 'Acesso não autorizado.' });
        }

        await pool.query(
            `UPDATE usuarios SET nome = ?, sobrenome = ?, empresa = ?, contato = ?, email = ?,
             cep = ?, logradouro = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, uf = ?
             WHERE id = ?`,
            [nome, sobrenome, empresa, contato, email, cep, logradouro, numero, complemento, bairro, cidade, uf, id]
        );

        const [atualizado] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        const { senha, ...usuario } = atualizado[0];
        res.json(usuario);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erro ao atualizar perfil.' });
    }
});


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


app.post('/categorias', async (req, res) => {
    const { descricao } = req.body;
    try {
        const [rows] = await pool.query(
            'INSERT INTO categorias (descricao) VALUES (?)',
            [descricao]
        );
        const [novo] = await pool.query('SELECT * FROM categorias WHERE id = ?', [rows.insertId]);
        res.status(201).json(novo[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar uma categoria' });
    }
});

app.get('/categorias', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categorias');
        res.json(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar categorias' })
    }
});

app.delete('/categorias/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM categorias WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        res.json({ message: 'Categoria deletada com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar categoria' });
    }
})

app.patch('/categorias/:id', async (req, res) => {
    const { id } = req.params;
    const { descricao } = req.body;

    try {
        await pool.query(
            'UPDATE categorias SET descricao = ? WHERE id = ?',
            [descricao, id]);

        const [atualzado] = await pool.query(`
            SELECT * FROM categorias WHERE id = ?
        `, [id]);

        res.json(atualzado[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erro ao atualizar categoria.' });
    }   
})

app.get('/produtos', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT p.id, p.descricao, c.descricao AS categoria 
            FROM produtos p
            JOIN categorias c ON p.categorias_id = c.id`
        );
        res.json(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar produtos' })
    }
});

app.post('/produtos', async (req, res) => {

    const { descricao, categorias_id } = req.body;

    try {
        const [rows] = await pool.query(
            'INSERT INTO produtos (descricao, categorias_id) VALUES (?, ?)',
            [descricao, categorias_id]
        );
        const [novo] = await pool.query(`
        SELECT p.id, p.descricao, p.categorias_id, c.descricao AS categoria
        FROM produtos p
        JOIN categorias c ON p.categorias_id = c.id
        WHERE p.id = ?
`, [rows.insertId]);
        res.status(201).json(novo[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar novo produto' });
    }
});

app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar produto' });
    }
})

app.patch('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const { descricao, categorias_id } = req.body;

    try {
        await pool.query(
            'UPDATE produtos SET descricao = ?, categorias_id = ? WHERE id = ?',
            [descricao, categorias_id, id]);

        const [atualzado] = await pool.query(`
            SELECT p.id, p.descricao, p.categorias_id, c.descricao AS categoria
            FROM produtos p
            JOIN categorias c ON p.categorias_id = c.id
            WHERE p.id = ?
        `, [id]);

        // const { senha, ...usuario } = atualzado[0];
        res.json(atualzado[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erro ao atualizar produto.' });
    }
})

app.post('/estoque', async (req, res) => {
    const { tipo, quantidade, preco_compra, produtos_id } = req.body;

    if (!tipo || !quantidade || !produtos_id) {
        return res.status(400).json({ error: 'Campos obrigatórios: tipo, quantidade, produtos_id' });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO estoque (tipo, quantidade, preco_compra, produtos_id)
             VALUES (?, ?, ?, ?)`,
            [tipo, quantidade, preco_compra || null, produtos_id]
        );

        const [lancamento] = await pool.query(`
            SELECT l.*, p.descricao AS produto
            FROM estoque l
            JOIN produtos p ON l.produtos_id = p.id
            WHERE l.id = ?
        `, [result.insertId]);

        res.status(201).json(lancamento[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar lançamento de estoque' });
    }
});

app.get('/estoque', async (req, res) => {
    const { produtoId } = req.query;

    try {
        let query = `
            SELECT 
                l.id,
                l.tipo,
                l.quantidade,
                l.preco_compra,
                l.data_lancamento,
                p.descricao AS produto_descricao
            FROM estoque l
            JOIN produtos p ON l.produtos_id = p.id
        `;

        const params = [];

        if (produtoId) {
            query += " WHERE p.id = ?";
            params.push(produtoId);
        }

        query += " ORDER BY l.data_lancamento DESC";

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar lançamentos de estoque' });
    }
});

// module.exports = app;
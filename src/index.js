import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'senai',
    database: 'estoqueplus',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

app.use(cors());
app.use(express.json());

app.get('/teste', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM teste');
        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.post('/teste', async (req, res) => {
    const { nome, email } = req.body;
    try {
        const [rows] = await pool.query(
            'INSERT INTO teste (nome, email) VALUES (?, ?)',
            [nome, email])
        res.statusCode(201).json(rows)
    } catch (error) {

    }
})

app.delete('/teste/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM teste where id = ?', [id]);
        res.json(result);
    } catch (err) {
        console.error(err.message);
    }
})

app.patch('/teste/:id', async (req, res) => {
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

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})

export default app;
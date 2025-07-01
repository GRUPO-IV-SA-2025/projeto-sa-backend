const express = require('express');
const bodyParser = require('body-parser');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
app.use(bodyParser.json());

// Rotas
app.use('/api/usuarios', usuarioRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

module.exports = app;  

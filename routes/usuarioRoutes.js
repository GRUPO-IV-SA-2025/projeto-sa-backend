const express = require('express');
const { cadastrar, listar } = require('../controllers/cadastroController');
const router = express.Router();

router.post('/', cadastrar);
router.get('/', listar);

module.exports = router;

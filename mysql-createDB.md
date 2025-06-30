CREATE DATABASE IF NOT EXISTS 
estoqueplus;
USE estoqueplus;

```

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    empresa VARCHAR(100) NOT NULL,
    contato VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cep VARCHAR(9),
    logradouro VARCHAR(255),
    numero INT,
    complemento VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    uf VARCHAR(2)
);

CREATE TABLE categorias (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	descricao VARCHAR(100) NOT NULL
);

CREATE TABLE produtos (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL,
    
	categorias_id INT,
    FOREIGN KEY (categorias_id)
    REFERENCES categorias (id)
);

CREATE TABLE estoque (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	tipo ENUM('entrada', 'saida') NOT NULL,
    quantidade INT NOT NULL,
    preco_compra DECIMAL(10,2),
    data_lancamento DATE NOT NULL DEFAULT (CURRENT_DATE),
    
	produtos_id INT,
    produto_nome VARCHAR(100),
    FOREIGN KEY (produtos_id) 
    REFERENCES produtos (id) 
    ON DELETE SET NULL
);

```
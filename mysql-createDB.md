CREATE DATABASE IF NOT EXISTS 
estoqueplus;
USE estoqueplus;

```

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
)

CREATE TABLE categorias (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	descricao VARCHAR(100) NOT NULL
);

CREATE TABLE produtos (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL,
    codigo INT,
    
	categorias_id INT,
    FOREIGN KEY (categorias_id)
    REFERENCES categorias (id)
);


```
CREATE DATABASE nvim;
USE nvim;

CREATE TABLE usuario(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL, 
	senha VARCHAR(45) NOT NULL,
	email VARCHAR(45) NOT NULL
);

CREATE TABLE questionario(
	id_questionario INT PRIMARY KEY AUTO_INCREMENT,
	qtd_acertos INT NOT NULL,
	qtd_erros INT NOT NULL,
	fk_usuario INT,
	CONSTRAINT ctFkUsuario FOREIGN KEY(fk_usuario) REFERENCES usuario(id_usuario)
);

INSERT INTO usuario (nome, senha, email) VALUES
('jacob', '123456', 'jacob@email.com'),
('vitor', '123456', 'vitor@email.com'),
('marina', '123456', 'marina@email.com'),
('pedrao', '123456', 'pedrao@email.com'),
('caio', '123456', 'caio@email.com'),
('emanuelly', '123456', 'emanuelly@email.com'),
('karina', '123456', 'karina@email.com'),
('victor', '123456', 'victor@email.com'),
('isaac', '123456', 'isaac@email.com');

INSERT INTO questionario (qtd_acertos, qtd_erros, fk_usuario) VALUES
(8, 2, 1),
(7, 3, 2),
(9, 1, 3),
(6, 4, 4),
(10, 0, 5),
(5, 5, 6),
(8, 2, 7),
(7, 3, 8),
(9, 1, 9);

CREATE DATABASE nvim;
USE nvim;

CREATE TABLE usuario (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
	senha VARCHAR(45) NOT NULL,
	email VARCHAR(45) NOT NULL,
	criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questao (
	id_questao INT PRIMARY KEY AUTO_INCREMENT,
	enunciado TEXT NOT NULL,
	alternativa_a VARCHAR(200) NOT NULL,
	alternativa_b VARCHAR(200) NOT NULL,
	alternativa_c VARCHAR(200) NOT NULL,
	alternativa_d VARCHAR(200) NOT NULL,
	alternativa_correta ENUM('alternativaA','alternativaB','alternativaC','alternativaD') NOT NULL,
	ordem INT NOT NULL
);

CREATE TABLE partida (
	id_partida INT PRIMARY KEY AUTO_INCREMENT,
	fk_usuario INT NOT NULL,
	qtd_acertos INT NOT NULL DEFAULT 0,
	qtd_erros INT NOT NULL DEFAULT 0,
	pontuacao INT NOT NULL DEFAULT 0,
	jogado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_partida_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE resposta (
	id_resposta INT PRIMARY KEY AUTO_INCREMENT,
	fk_partida INT NOT NULL,
	fk_questao INT NOT NULL,
	alternativa_escolhida ENUM('alternativaA','alternativaB','alternativaC','alternativaD') NOT NULL,
	acertou BOOLEAN NOT NULL,
	CONSTRAINT fk_resposta_partida FOREIGN KEY (fk_partida) REFERENCES partida(id_partida),
	CONSTRAINT fk_resposta_questao FOREIGN KEY (fk_questao) REFERENCES questao(id_questao)
);

INSERT INTO usuario (nome, senha, email) VALUES
	('jacob','123456','jacob@email.com'),
	('vitor','123456','vitor@email.com'),
	('marina','123456','marina@email.com'),
	('pedrao','123456','pedrao@email.com'),
	('caio','123456', 'caio@email.com'),
	('emanuelly','123456','emanuelly@email.com'),
	('karina','123456','karina@email.com'),
	('victor','123456','victor@email.com'),
	('isaac','123456','isaac@email.com');

INSERT INTO questao (enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, alternativa_correta, ordem) VALUES
	('O que é o NeoVim?','Uma IDE completa com tudo configurado por padrão','Um editor de texto que roda no terminal, focado no uso do teclado e na personalização','Um sistema operacional baseado em Linux','Um plugin para o VS Code','alternativaB',1),
	('De qual editor o Neovim é uma evolução?','Emacs','Nano','Vim, que é derivado do Vi','Sublime Text','alternativaC',2),
	('Qual linguagem é usada para configurar o Neovim?','Python','JavaScript','Ruby','Lua','alternativaD',3),
	('Qual é o nome do arquivo de inicialização da configuração do Neovim?','config.lua','setup.lua','neovim.lua','init.lua','alternativaD',4),
	('Qual plataforma popular também usa a linguagem Lua?','Minecraft','Roblox','Godot','Unity','alternativaB',5),
	('Qual comando instala o Neovim no Windows?','apt install neovim','winget install neovim','choco install nvim','brew install neovim','alternativaB',6),
	('Qual comando instala o Neovim no Linux?','winget install neovim','sudo apt install neovim','npm install neovim','pip install neovim','alternativaB',7),
	('Como você abre o modo de comando no Neovim para poder sair?','Pressionando Esc','Pressionando Ctrl+C','Pressionando :','Pressionando Q','alternativaC',8),
	('Qual comando fecha o Neovim?',':exit',':close',':end',':q','alternativaD',9),
	('Qual comando abre o tutorial oficial do Neovim dentro do editor?',':help',':learn',':Tutor',':start','alternativaC',10);

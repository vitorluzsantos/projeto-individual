var database = require("../database/config");

function buscarDadosGeral() {
  var instrucaoSql = `
    SELECT 
      u.nome,
      SUM(p.qtd_acertos)  AS total_acertos,
      SUM(p.qtd_erros)    AS total_erros,
      SUM(p.pontuacao)    AS total_pontuacao,
      COUNT(p.id_partida) AS total_partidas
    FROM partida p
    JOIN usuario u ON p.fk_usuario = u.id_usuario
    GROUP BY u.id_usuario, u.nome
    ORDER BY total_pontuacao DESC
  `;
  console.log("Executando SQL:\n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarResumoPessoal(fkUsuario) {
  var instrucaoSql = `
    SELECT
      SUM(qtd_acertos)    AS total_acertos,
      SUM(qtd_erros)      AS total_erros,
      COUNT(id_partida)   AS total_partidas,
      MAX(pontuacao)      AS melhor_pontuacao,
      AVG(pontuacao)      AS media_pontuacao
    FROM partida
    WHERE fk_usuario = ${fkUsuario}
  `;
  console.log("Executando SQL:\n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarPosicaoRanking(fkUsuario) {
  var instrucaoSql = `
    SELECT posicao FROM (
      SELECT 
        fk_usuario,
        SUM(pontuacao) AS total,
        RANK() OVER (ORDER BY SUM(pontuacao) DESC) AS posicao
      FROM partida
      GROUP BY fk_usuario
    ) AS ranking
    WHERE fk_usuario = ${fkUsuario}
  `;
  console.log("Executando SQL:\n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarPartidasPessoal(fkUsuario) {
  var instrucaoSql = `
    SELECT id_partida, qtd_acertos, qtd_erros, pontuacao, jogado_em
    FROM partida
    WHERE fk_usuario = ${fkUsuario}
    ORDER BY jogado_em ASC
  `;
  console.log("Executando SQL:\n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarQuestoesUltimaPartida(fkUsuario) {
  var instrucaoSql = `
    SELECT 
      q.enunciado,
      r.alternativa_escolhida,
      r.acertou
    FROM resposta r
    JOIN questao q ON r.fk_questao = q.id_questao
    WHERE r.fk_partida = (
      SELECT id_partida 
      FROM partida
      WHERE fk_usuario = ${fkUsuario}
      ORDER BY jogado_em DESC
      LIMIT 1
    )
    ORDER BY q.ordem ASC
  `;
  console.log("Executando SQL:\n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarDadosGeral,
  buscarResumoPessoal,
  buscarPosicaoRanking,
  buscarPartidasPessoal,
  buscarQuestoesUltimaPartida
};

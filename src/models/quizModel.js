var database = require("../database/config");

function buscarQuestoes() {
  var instrucaoSql = `
    SELECT id_questao, enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, alternativa_correta, ordem
    FROM questao
    ORDER BY ordem ASC
  `;
  console.log("Executando SQL:\n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function criarPartida(fkUsuario) {
  var instrucaoSql = `
    INSERT INTO partida (fk_usuario, qtd_acertos, qtd_erros, pontuacao)
    VALUES (${fkUsuario}, 0, 0, 0)
  `;
  console.log("Executando SQL:\n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function salvarResposta(fkPartida, fkQuestao, alternativaEscolhida, acertou) {
  var instrucaoSql = `
    INSERT INTO resposta (fk_partida, fk_questao, alternativa_escolhida, acertou)
    VALUES (${fkPartida}, ${fkQuestao}, '${alternativaEscolhida}', ${acertou ? 1 : 0})
  `;
  console.log("Executando SQL:\n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function finalizarPartida(idPartida, qtdAcertos, qtdErros, pontuacao) {
  var instrucaoSql = `
    UPDATE partida
    SET qtd_acertos = ${qtdAcertos}, qtd_erros = ${qtdErros}, pontuacao = ${pontuacao}
    WHERE id_partida = ${idPartida}
  `;
  console.log("Executando SQL:\n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarPartidasUsuario(fkUsuario) {
  var instrucaoSql = `
    SELECT id_partida, qtd_acertos, qtd_erros, pontuacao, jogado_em
    FROM partida
    WHERE fk_usuario = ${fkUsuario}
    ORDER BY jogado_em DESC
  `;
  console.log("Executando SQL:\n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarQuestoes,
  criarPartida,
  salvarResposta,
  finalizarPartida,
  buscarPartidasUsuario
};

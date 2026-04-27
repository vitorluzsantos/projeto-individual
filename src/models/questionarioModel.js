var database = require("../database/config");

function buscarQuestionarioUsuario(usuarioId) {

  var instrucaoSql = `SELECT * FROM questionario a WHERE fk_usuario = ${usuarioId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(usuarioId, qtdAcertos, qtdErros) {
  
  var instrucaoSql = `INSERT INTO questionario(qtd_acertos, qtd_erros, fk_usuario) VALUES (${qtdAcertos}, ${qtdErros}, ${usuarioId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarQuestionarioUsuario,
  cadastrar
}

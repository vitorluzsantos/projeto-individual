var dashboardModel = require("../models/dashboardModel");

function buscarDadosGeral(req, res) {
  dashboardModel.buscarDadosGeral()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.json(resultado);
      } else {
        res.status(204).send("Nenhuma partida cadastrada");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosPessoal(req, res) {
  var idUsuario = req.params.idUsuario;

  if (!idUsuario) {
    return res.status(400).send("idUsuario é obrigatório");
  }

  Promise.all([
    dashboardModel.buscarResumoPessoal(idUsuario),
    dashboardModel.buscarPosicaoRanking(idUsuario),
    dashboardModel.buscarPartidasPessoal(idUsuario),
    dashboardModel.buscarQuestoesUltimaPartida(idUsuario)
  ])
    .then(function (resultados) {
      var resumo = resultados[0][0]; 
      var posicao = resultados[1][0];
      var partidas = resultados[2]; 
      var ultimaPartida = resultados[3];

      var resposta = {
        total_acertos: resumo  ? resumo.total_acertos   : 0,
        total_erros: resumo  ? resumo.total_erros     : 0,
        total_partidas: resumo  ? resumo.total_partidas  : 0,
        melhor_pontuacao: resumo  ? resumo.melhor_pontuacao : 0,
        media_pontuacao: resumo  ? resumo.media_pontuacao  : 0,
        posicao_ranking: posicao ? posicao.posicao         : "--",
        partidas: partidas,
        ultima_partida: ultimaPartida
      };

      res.json(resposta);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  buscarDadosGeral,
  buscarDadosPessoal
};

var quizModel = require("../models/quizModel");

function buscarQuestoes(req, res) {
  quizModel.buscarQuestoes()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.json(resultado);
      } else {
        res.status(204).send("Nenhuma questão cadastrada");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function iniciarPartida(req, res) {
  var idUsuario = req.body.idUsuario;

  if (!idUsuario) {
    return res.status(400).send("idUsuario é obrigatório");
  }

  quizModel.criarPartida(idUsuario)
    .then(function (resultado) {
      res.status(201).json({ idPartida: resultado.insertId });
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function salvarResposta(req, res) {
  var { idPartida, idQuestao, alternativaEscolhida, acertou } = req.body;

  if (!idPartida || !idQuestao || !alternativaEscolhida || acertou === undefined) {
    return res.status(400).send("Campos obrigatórios: idPartida, idQuestao, alternativaEscolhida, acertou");
  }

  quizModel.salvarResposta(idPartida, idQuestao, alternativaEscolhida, acertou)
    .then(function () {
      res.status(201).send("Resposta salva");
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function finalizarPartida(req, res) {
  var { idPartida, qtdAcertos, qtdErros, pontuacao } = req.body;

  if (!idPartida || qtdAcertos === undefined || qtdErros === undefined || pontuacao === undefined) {
    return res.status(400).send("Campos obrigatórios: idPartida, qtdAcertos, qtdErros, pontuacao");
  }

  quizModel.finalizarPartida(idPartida, qtdAcertos, qtdErros, pontuacao)
    .then(function () {
      res.status(200).send("Partida finalizada");
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarHistorico(req, res) {
  var idUsuario = req.params.idUsuario;

  if (!idUsuario) {
    return res.status(400).send("idUsuario é obrigatório");
  }

  quizModel.buscarPartidasUsuario(idUsuario)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  buscarQuestoes,
  iniciarPartida,
  salvarResposta,
  finalizarPartida,
  buscarHistorico
};

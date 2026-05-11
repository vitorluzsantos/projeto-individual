var express = require("express");
var router = express.Router();
var quizController = require("../controllers/quizController");

router.get("/questoes",               quizController.buscarQuestoes);
router.post("/iniciar",               quizController.iniciarPartida);
router.post("/resposta",              quizController.salvarResposta);
router.put("/finalizar",              quizController.finalizarPartida);
router.get("/historico/:idUsuario",   quizController.buscarHistorico);

module.exports = router;

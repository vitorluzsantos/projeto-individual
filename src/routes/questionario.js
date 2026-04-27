var express = require("express");
var router = express.Router();

var questionarioController = require("../controllers/questionarioController");

router.get("/buscar/:idUsuario", function (req, res) {
    questionarioController.buscarQuestionario(req, res);
});
router.post("/cadastrar", function (req, res) {
  questionarioController.cadastrar(req, res);
});

module.exports = router;

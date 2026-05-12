var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

router.get("/geral",              dashboardController.buscarDadosGeral);
router.get("/pessoal/:idUsuario", dashboardController.buscarDadosPessoal);

module.exports = router;

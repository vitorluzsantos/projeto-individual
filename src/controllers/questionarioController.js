var questionarioModel = require("../models/questionarioModel");

function buscarQuestionario(req, res) {

	var idUsuario = req.params.idUsuario;

	console.log("ID USUARIO RECEBIDO:", idUsuario);

	if (!idUsuario) {
		res.status(400).send("ID do usuário undefined");
		return;
	}

	questionarioModel.buscarQuestionarioUsuario(idUsuario)
		.then(function (resultado) {
			if (resultado.length > 0) {
				res.json(resultado);
			} else {
				res.status(204).send("Nenhum resultado encontrado");
			}
		})
		.catch(function (erro) {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

module.exports = {
	buscarQuestionario
};

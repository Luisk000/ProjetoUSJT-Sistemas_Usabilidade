const express = require("express");
const router = express.Router();
const login = require('../middleware/login');

const VagasUsuarioController = require('../controllers/vagasUsuario-controller');

router.get("/obterTodas", login.required, VagasUsuarioController.ObterTodas);
router.get("/obterTop20", login.required, VagasUsuarioController.ObterTop20);
router.get("/obterAreaMais", login.required, VagasUsuarioController.ObterAreaMais);
router.get("/obterPorId/:id", login.required, VagasUsuarioController.ObterPorId);
router.get("/obterPorUsuarioId/:id_usuario", login.required, VagasUsuarioController.ObterPorUsuarioId);
router.post("/obterFiltroNome", login.required, VagasUsuarioController.ObterFiltroNome);
router.post("/obterFiltroDescricao", login.required, VagasUsuarioController.ObterFiltroDescricao);
router.post("/candidatar", login.required, VagasUsuarioController.Candidatar);
router.post("/obterCandidatoInscrito", login.required, VagasUsuarioController.ObterVagaCandidato);

module.exports = router;
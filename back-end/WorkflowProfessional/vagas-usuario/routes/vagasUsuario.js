const express = require("express");
const router = express.Router();

const VagasUsuarioController = require('../controllers/vagasUsuario-controller');

router.get("/obterTodas", VagasUsuarioController.ObterTodas);
router.get("/obterTop20", VagasUsuarioController.ObterTop20);
router.get("/obterAreaMais", VagasUsuarioController.ObterAreaMais);
router.get("/obterPorId/:id", VagasUsuarioController.ObterPorId);
router.get("/obterPorUsuarioId/:id_usuario", VagasUsuarioController.ObterPorUsuarioId);
router.post("/obterFiltroNome", VagasUsuarioController.ObterFiltroNome);
router.post("/obterFiltroDescricao", VagasUsuarioController.ObterFiltroDescricao);
router.post("/candidatar", VagasUsuarioController.Candidatar);

module.exports = router;
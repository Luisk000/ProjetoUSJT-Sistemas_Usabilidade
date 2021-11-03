const express = require("express");
const router = express.Router();
const login = require('../middleware/login');

const VagasAdminController = require('../controllers/vagasAdmin-controller');

router.get("/obterVagasPorIdAdmin/:admin_id", login.required, VagasAdminController.ObterVagasPorIdAdmin);
router.post("/obterCandidatosInscritosPorIdAdmin", login.required, VagasAdminController.ObterCandidatosInscritos);
router.get("/obterVagaPorId/:id", login.required, VagasAdminController.ObterVagaPorId);
router.post("/cadastrarVaga", login.required, VagasAdminController.CadastrarVaga);
router.put("/atualizarVaga/:id", login.required, VagasAdminController.AtualizarVaga);
router.delete("/excluirVaga/:id", login.required, VagasAdminController.ExcluirAdmin);

module.exports = router;
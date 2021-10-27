const express = require("express");
const router = express.Router();

const VagasAdminController = require('../controllers/vagasAdmin-controller');

router.get("/obterVagasPorIdAdmin/:admin_id", VagasAdminController.ObterVagasPorIdAdmin);
router.get("/obterVagaPorId/:id", VagasAdminController.ObterVagaPorId);
router.post("/cadastrarVaga", VagasAdminController.CadastrarVaga);
router.put("/atualizarVaga/:id", VagasAdminController.AtualizarVaga);
router.delete("/excluirVaga/:id", VagasAdminController.ExcluirAdmin);

module.exports = router;
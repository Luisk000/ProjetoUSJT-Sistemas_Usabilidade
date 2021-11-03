const express = require("express");
const router = express.Router();
const login = require('../middleware/login');

const CadastroAdminController = require('../controllers/cadastroAdmin-controller');

router.get("/obterPorId/:id", login.required, CadastroAdminController.ObterPorId);
router.put("/atualizar/:id", login.required, CadastroAdminController.Atualizar);

module.exports = router;
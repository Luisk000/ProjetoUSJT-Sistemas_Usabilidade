const express = require("express");
const router = express.Router();
const login = require('../middleware/login');

const CadastroUsuarioController = require('../controllers/cadastroUsuario-controller');

router.get("/obterPorEmail/:email", login.required, CadastroUsuarioController.ObterPorEmail);
router.get("/obterPorId/:id", login.required, CadastroUsuarioController.ObterPorId);
router.put("/atualizar/:id", login.required, CadastroUsuarioController.Atualizar);

module.exports = router;
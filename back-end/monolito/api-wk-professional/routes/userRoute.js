const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/admin/registro', userController.registroAdmin);
router.post('/admin/login', userController.LoginAdmin);
router.post('/usuario/registro', userController.registroUsuario);
router.post('/usuario/login', userController.LoginUsuario);

module.exports = router;
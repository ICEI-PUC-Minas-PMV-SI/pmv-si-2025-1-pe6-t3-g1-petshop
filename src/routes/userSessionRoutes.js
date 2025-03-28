const express = require("express");
const { loginUser, logoutUser } = require("../controllers/userSessionController");
const router = express.Router();
const tokenVerify = require("../middleware/tokenVerify")

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica um usuário
 *     description: Permite que um usuário faça login e receba um token de autenticação.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "usuario@example.com"
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: "minhaSenhaSegura"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Credenciais incorretas
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Faz logout do usuário
 *     description: Encerra a sessão do usuário e invalida o token de autenticação.
 *     tags:
 *       - Autenticação
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *       401:
 *         description: Usuário não autenticado
 *       500:
 *         description: Erro interno do servidor
 */

router.post("/login", loginUser);
router.post("/logout", tokenVerify, logoutUser);


module.exports = router;

const express = require("express");
const { loginOwner, logoutOwner } = require("../controllers/ownerSessionController");
const router = express.Router();

/**
 * @swagger
 * /owner/login:
 *   post:
 *     summary: Autentica um dono de pet
 *     description: Permite que um dono de pet faça login e receba um token de autenticação.
 *     tags:
 *       - Autenticação de Dono
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
 *                 example: "dono@example.com"
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
 * /owner/logout:
 *   post:
 *     summary: Faz logout do dono de pet
 *     description: Encerra a sessão do dono de pet e invalida o token de autenticação.
 *     tags:
 *       - Autenticação de Dono
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *       401:
 *         description: Dono não autenticado
 *       500:
 *         description: Erro interno do servidor
 */

router.post("/owner/login", loginOwner);
router.post("/owner/logout", logoutOwner);

module.exports = router;
// routes/profissionalRoutes.js
const express = require('express');
const { getProfissionais, createProfissional } = require('../controllers/profissionalController');
const router = express.Router();
const tokenVerify = require("../middleware/tokenVerify")

/**
 * @swagger
 * /profissionais:
 *   get:
 *     summary: Retorna todos os profissionais
 *     tags: [Profissionais]
 *     responses:
 *       200:
 *         description: Lista de profissionais retornada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /profissionais/create-new:
 *   post:
 *     summary: Cria um novo profissional
 *     tags: [Profissionais]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Carlos Oliveira"
 *               cargo:
 *                 type: string
 *                 example: "Tosador"
 *     responses:
 *       201:
 *         description: Profissional criado com sucesso.
 *       500:
 *         description: Erro ao criar profissional.
 */

router.get("/", tokenVerify, getProfissionais);
router.post("/create-new", tokenVerify, createProfissional);

module.exports = router;

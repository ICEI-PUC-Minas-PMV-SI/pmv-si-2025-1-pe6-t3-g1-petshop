// routes/profissionalRoutes.js
const express = require('express');
const { getProfissionais, createProfissional } = require('../controllers/profissionalController');
const router = express.Router();

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
 * /profissionais:
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

router.get("/", getProfissionais);
router.post("/", createProfissional);

module.exports = router;

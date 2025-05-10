// routes/profissionalRoutes.js
const express = require('express');
const { getProfissionais, createProfissional } = require('../controllers/profissionalController');
const router = express.Router();
<<<<<<< HEAD
=======
const tokenVerify = require("../middleware/tokenVerify")
>>>>>>> 101cd35693b34708b56f4b50303526e50490d03c

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
<<<<<<< HEAD
 * /profissionais:
=======
 * /profissionais/create-new:
>>>>>>> 101cd35693b34708b56f4b50303526e50490d03c
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

<<<<<<< HEAD
router.get("/", getProfissionais);
router.post("/", createProfissional);
=======
router.get("/", tokenVerify, getProfissionais);
router.post("/create-new", tokenVerify, createProfissional);
>>>>>>> 101cd35693b34708b56f4b50303526e50490d03c

module.exports = router;

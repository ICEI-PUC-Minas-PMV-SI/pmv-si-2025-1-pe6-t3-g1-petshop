const express = require("express")
const { getTests } = require("../controllers/testController");
const router = express.Router()

/**
 * @swagger
 * /tests:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: Lista de testes retornada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */

router.get("/tests", getTests)

module.exports = router
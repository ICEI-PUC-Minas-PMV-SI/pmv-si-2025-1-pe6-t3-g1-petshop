const express = require("express");
const { findAll, create, findSingle, updateSingle, deleteSingle} = require("../controllers/faturaController");
const router = express.Router();
const tokenVerify = require("../middleware/tokenVerify")

/**
 * @swagger
 * /faturas:
 *   get:
 *     summary: Retorna todas as faturas
 *     tags: [Faturas]
 *     responses:
 *       200:
 *         description: Lista de faturas retornada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */


/**
 * @swagger
 * /faturas:
 *   post:
 *     summary: Cria uma nova fatura
 *     tags: [Faturas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pessoa_id:
 *                 type: integer
 *                 example: 8
 *               desconto:
 *                 type: decimal
 *                 example: 11.98
 *               pagamento_id:
 *                  type: integer
 *                  example: 1
 *     responses:
 *       201:
 *         description: Fatura criada com sucesso.
 *       500:
 *         description: Erro ao criar fatura.
 */

/**
 * @swagger
 * /faturas/{id}:
 *   get:
 *     summary: Retorna uma fatura
 *     description: Obtém um registro individual de fatura
 *     tags:
 *       - Faturas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da fatura
 *     responses:
 *       200:
 *         description: Fatura
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     format: integer
 *                     example: 1012
 *                   pessoa_id:
 *                     type: integer
 *                     format: integer
 *                     example: 8
 *                   status:
 *                     type: string
 *                     example: F
 *                   desconto:
 *                     type: decimal
 *                     example: 5.0
 *                   valor:
 *                     type: decimal
 *                     example: 135.79
 *                   user_id:
 *                     type: integer
 *                     example: 8
 *                   pagamento_id:
 *                     type: integer
 *                     example: 1
 *                   creted_at:
 *                     type: integer
 *                     example: 1743005579160
 *                   updated_at:
 *                     type: integer
 *                     example: 1743005579160
 *       404:
 *         description: Fatura não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /faturas/{id}:
 *   put:
 *     summary: Atualiza fatura
 *     description: Atualiza um registro individual de fatura
 *     tags:
 *       - Faturas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da fatura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   pessoa_id:
 *                     type: integer
 *                     format: integer
 *                     example: 1012
 *                   status:
 *                     type: string
 *                     example: F
 *                   desconto:
 *                     type: decimal
 *                     example: 5.10
 *                   pagamento_id:
 *                     type: integer
 *                     example: 1
 *       404:
 *         description: Fatura não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /faturas/{id}:
 *   delete:
 *     summary: Exclui uma fatura individual
 *     tags: [Faturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da fatura
 *     responses:
 *       204:
 *        description: The resource was deleted successfully.
 *       500:
 *         description: Erro interno do servidor.
 */

router.get("/", tokenVerify, findAll);
router.post("/", tokenVerify, create);
router.get("/:id", tokenVerify, findSingle);
router.put("/:id", tokenVerify, updateSingle);
router.delete("/:id", tokenVerify, deleteSingle);

module.exports = router;
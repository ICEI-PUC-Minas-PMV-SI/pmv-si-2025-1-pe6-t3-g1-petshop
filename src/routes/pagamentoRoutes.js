const express = require("express");
const { findAll, create, findSingle, updateSingle, deleteSingle } = require("../controllers/pagamentoController");
const router = express.Router();
const tokenVerify = require("../middleware/tokenVerify");

/**
 * @swagger
 * /pagamentos:
 *   get:
 *     summary: Retorna todas as formas de pagamentos
 *     tags: [Pagamentos]
 *     responses:
 *       200:
 *         description: Lista de formas de pagamentos retornada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /pagamentos:
 *   post:
 *     summary: Cria uma nova forma de pagamento
 *     tags: [Pagamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Dinheiro
 *               descricao:
 *                 type: string
 *                 example: Dinheiro em especie
 *               condicao:
 *                 type: string
 *                 example: vista
 *     responses:
 *       201:
 *         description: Forma de Pagamento criada com sucesso.
 *       500:
 *         description: Erro ao criar pagamento.
 */

/**
 * @swagger
 * /pagamentos/{id}:
 *   get:
 *     summary: Obtém um registro individual de forma pagamento
 *     description: Retorna uma pagamento
 *     tags:
 *       - Pagamentos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da forma de pagamento
 *     responses:
 *       200:
 *         description: Pagamento
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
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: Dinheiro
 *                   descricao:
 *                     type: string
 *                     example: Dinheiro em especie
 *                   condicao:
 *                     type: string
 *                     example: vista
 *                   creted_at:
 *                     type: integer
 *                     example: 1743005579160
 *                   updated_at:
 *                     type: integer
 *                     example: 1743005579160
 *       404:
 *         description: Pagamento não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /pagamentos/{id}:
 *   put:
 *     summary: Atualiza um pagamento individual
 *     tags: [Pagamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da forma de pagamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: integer
 *                 example: Dinheiro
 *               descricao:
 *                 type: string
 *                 example: Dinheiro em especie
 *               condicao:
 *                 type: string
 *                 example: vista
 *     responses:
 *       204:
 *        description: The resource was update successfully.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /pagamentos/{id}:
 *   delete:
 *     summary: Exclui uma forma de pagamento individual
 *     tags: [Pagamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da forma de pagamento
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
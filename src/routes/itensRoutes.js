const express = require("express");
const { findAll, create, updateSingle, deleteSingle,} = require("../controllers/itemController");
const router = express.Router();
const tokenVerify = require("../middleware/tokenVerify");

/**
 * @swagger
 * /itens:
 *   get:
 *     summary: Retorna todos os itens
 *     tags: [Itens]
 *     responses:
 *       200:
 *         description: Lista de itens retornada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /itens:
 *   post:
 *     summary: Cria um novo item
 *     tags: [Itens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fatura_id:
 *                 type: integer
 *                 example: 123
 *               produto_id:
 *                 type: integer
 *                 example: 12
 *               servico_id:
 *                 type: integer
 *                 example: 0
 *               quantidade:
 *                 type: decimal
 *                 example: 1.9
 *               servico:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       201:
 *         description: Item criada com sucesso.
 *       500:
 *         description: Erro ao criar item.
 */

/**
 * @swagger
 * /itens/{id}:
 *   put:
 *     summary: Atualiza um item individualmente
 *     tags: [Itens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantidade:
 *                 type: decimal
 *                 example: 1.5
 *     responses:
 *       204:
 *        description: The resource was update successfully.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /itens/{id}:
 *   delete:
 *     summary: Exclui um item individualmente
 *     tags: [Itens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item
 *     responses:
 *       204:
 *        description: The resource was deleted successfully.
 *       500:
 *         description: Erro interno do servidor.
 */


router.get("/",  tokenVerify, findAll);
router.post("/",  tokenVerify, create);
router.put("/:id",  tokenVerify, updateSingle);
router.delete("/:id",  tokenVerify, deleteSingle);

module.exports = router;
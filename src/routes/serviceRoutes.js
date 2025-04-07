// routes/serviceRoutes.js
const express = require("express");
const { getServices, createService, updateService, deleteService } = require("../controllers/serviceController");
const router = express.Router();
const tokenVerify = require("../middleware/tokenVerify")

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Retorna todos os serviços
 *     tags: [Serviços]
 *     responses:
 *       200:
 *         description: Lista de serviços retornada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get("/", tokenVerify, getServices);

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Cria um novo serviço associado a um profissional
 *     tags: [Serviços]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo: 
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               profissional_id:
 *                 type: string
 *                 example: 1
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso.
 *       500:
 *         description: Erro ao criar serviço.
 */
router.post("/", tokenVerify, createService);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Atualiza um serviço existente
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo: 
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               profissional_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso.
 *       404:
 *         description: Serviço não encontrado.
 *       500:
 *         description: Erro ao atualizar serviço.
 */
router.put("/:id", tokenVerify, updateService);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Deleta um serviço existente
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do serviço
 *     responses:
 *       200:
 *         description: Serviço deletado com sucesso.
 *       404:
 *         description: Serviço não encontrado.
 *       500:
 *         description: Erro ao deletar serviço.
 */
router.delete("/:id", tokenVerify, deleteService);

module.exports = router;

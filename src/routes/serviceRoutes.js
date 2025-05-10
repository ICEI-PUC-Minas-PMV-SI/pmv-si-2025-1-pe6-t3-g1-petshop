// routes/serviceRoutes.js
const express = require("express");
const { getServices, createService, updateService, deleteService } = require("../controllers/serviceController");
const router = express.Router();
<<<<<<< HEAD
=======
const tokenVerify = require("../middleware/tokenVerify")
>>>>>>> 101cd35693b34708b56f4b50303526e50490d03c

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
<<<<<<< HEAD
router.get("/", getServices);
=======
router.get("/", tokenVerify, getServices);
>>>>>>> 101cd35693b34708b56f4b50303526e50490d03c

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
<<<<<<< HEAD
 *                 example: "uuid-do-profissional"
=======
 *                 example: 1
>>>>>>> 101cd35693b34708b56f4b50303526e50490d03c
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso.
 *       500:
 *         description: Erro ao criar serviço.
 */
<<<<<<< HEAD
router.post("/", createService);
=======
router.post("/", tokenVerify, createService);
>>>>>>> 101cd35693b34708b56f4b50303526e50490d03c

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
<<<<<<< HEAD
router.put("/:id", updateService);
=======
router.put("/:id", tokenVerify, updateService);
>>>>>>> 101cd35693b34708b56f4b50303526e50490d03c

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
<<<<<<< HEAD
router.delete("/:id", deleteService);
=======
router.delete("/:id", tokenVerify, deleteService);
>>>>>>> 101cd35693b34708b56f4b50303526e50490d03c

module.exports = router;

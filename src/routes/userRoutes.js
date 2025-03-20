const express = require("express");
const { getUsers, createUser, getRoles } = require("../controllers/userController");
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               senha_hash:
 *                 type: string
 *                 example: "123456"
 *               telefone:
 *                  type: string
 *                  example: 999999999
 *               role:
 *                  type: integer
 *                  example: 2
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       500:
 *         description: Erro ao criar usuário.
 */



/**
 * @swagger
 * /users/{id}/roles:
 *   get:
 *     summary: Obtém os papéis (roles) de um usuário
 *     description: Retorna a role do usuário
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de roles do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: 384e1d93-fe0f-47ed-9b17-e751c8c2f82c
 *                   role:
 *                     type: integer
 *                     example: 2
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id/roles", getRoles);


module.exports = router;

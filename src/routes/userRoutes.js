const express = require("express");
const {
  getUsers,
  createUser,
  getRoles,
  deleteUser,
  editUser,
  editPassword
} = require("../controllers/userController");
const router = express.Router();
const tokenVerify = require("../middleware/tokenVerify")

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
 * /users/new-user:
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
 *               senha:
 *                 type: string
 *                 example: "123456"
 *               telefone:
 *                  type: string
 *                  example: 999999999
 *               role_id:
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
 * /users/{id}/update:
 *   patch:
 *     summary: Edita um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
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
 *               senha:
 *                 type: string
 *                 example: "123456"
 *               telefone:
 *                  type: string
 *                  example: 999999999
 *     responses:
 *       201:
 *         description: Usuário editado com sucesso.
 *       500:
 *         description: Erro ao editar usuário.
 */

/**
 * @swagger
 * /users/{id}/roles:
 *   get:
 *     summary: Obtém os papéis (roles) de um usuário
 *     description: Retorna a role do usuário
 *     tags: [Usuários]
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
 *                   role:
 *                     type: integer
 *                     example: 2
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /users/{id}/delete:
 *   delete:
 *     summary: Deleta um usuário
 *     description: Deleta a linha do usuário cujo id foi passado
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /users/{id}/new-password:
 *   patch:
 *     summary: Atualiza a senha do usuário
 *     description: Atualiza a senha do usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senhaAtual:
 *                 type: string
 *                 example: "q123456Q!"
 *               novaSenha:
 *                 type: string
 *                 example: "r321654R!"
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       401:
 *         description: Senha atual incorreta
 *       500:
 *         description: Erro ao alterar a senha
 */

router.get("/", tokenVerify, getUsers);
router.post("/new-user", createUser);
router.patch("/:id/update", tokenVerify, editUser);
router.delete("/:id/delete", tokenVerify, deleteUser);
router.get("/:id/roles", tokenVerify, getRoles);
router.patch("/:id/new-password", tokenVerify, editPassword);

module.exports = router;

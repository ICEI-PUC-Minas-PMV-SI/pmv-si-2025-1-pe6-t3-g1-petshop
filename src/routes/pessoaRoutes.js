const express = require("express");
const {
  findAll,
  create,
  findSingle,
  updateSingle,
  deleteSingle,
} = require("../controllers/pessoaController");
const router = express.Router();
const tokenVerify = require("../middleware/tokenVerify");

/**
 * @swagger
 * /pessoas:
 *   get:
 *     summary: Retorna todas as pessoas
 *     tags: [Pessoas]
 *     responses:
 *       200:
 *         description: Lista de pessoas retornada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /pessoas/new-pessoa:
 *   post:
 *     summary: Cria uma nova pessoa
 *     tags: [Pessoas]
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
 *               cpf_cnpj:
 *                 type: string
 *                 example: "12345678900"
 *               tipo:
 *                 type: string
 *                 example: "F"
 *               nascimento:
 *                  type: date
 *                  example: 01/01/2000
 *               genero:
 *                  type: string
 *                  example: "M"
 *               telefone:
 *                  type: string
 *                  example: 31912345678
 *               email:
 *                  type: string
 *                  example: joao@silva.com.br
 *               endereco:
 *                  type: string
 *                  example: Rua Julio Cesar
 *               endereco_num:
 *                  type: integer
 *                  example: 100
 *               endereco_comp:
 *                  type: string
 *                  example: Apto 306
 *               endereco_bairro:
 *                  type: string
 *                  example: Imperadores
 *               cidade:
 *                  type: string
 *                  example: Belo Horizonte
 *               estado:
 *                  type: string
 *                  example: MG
 *               pais:
 *                  type: string
 *                  example: Brasil
 *               cep:
 *                  type: integer
 *                  example: 31000100
 *     responses:
 *       201:
 *         description: Pessoa criada com sucesso.
 *       500:
 *         description: Erro ao criar pessoa.
 */

/**
 * @swagger
 * /pessoas/{id}:
 *   get:
 *     summary: Obtém um registro individual de pessoa
 *     description: Retorna uma pessoa
 *     tags:
 *       - Pessoas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da pessoa
 *     responses:
 *       200:
 *         description: Pessoa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 12
 *                   nome:
 *                     type: string
 *                     example: "João Silva"
 *                   cpf_cnpj:
 *                     type: string
 *                     example: "12345678900"
 *                   tipo:
 *                     type: string
 *                     example: "F"
 *                   nascimento:
 *                      type: date
 *                      example: 01/01/2000
 *                   genereo:
 *                      type: string
 *                      example: "M"
 *                   telefone:
 *                      type: string
 *                      example: 31912345678
 *                   email:
 *                      type: string
 *                      example: joao@silva.com.br
 *                   status:
 *                      type: integer
 *                      example: 1
 *                   endereco:
 *                      type: string
 *                      example: Rua Julio Cesar
 *                   endereco_num:
 *                      type: integer
 *                      example: 100
 *                   endereco_comp:
 *                      type: string
 *                      example: Apto 306
 *                   endereco_bairro:
 *                      type: string
 *                      example: Imperadores
 *                   cidade:
 *                      type: string
 *                      example: Belo Horizonte
 *                   estado:
 *                      type: string
 *                      example: MG
 *                   pais:
 *                      type: string
 *                      example: Brasil
 *                   cep:
 *                      type: integer
 *                      example: 31000100
 *                   user_id:
 *                      type: integer
 *                      example: 1
 *                   creted_at:
 *                     type: integer
 *                     example: 1743005579160
 *                   updated_at:
 *                     type: integer
 *                     example: 1743005579160
 *       404:
 *         description: Pessoa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /pessoas/{id}/update:
 *   put:
 *     summary: Atualiza um registro de pessoa individualmente
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da pessoa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   nome:
 *                     type: string
 *                     example: "João Silva"
 *                   cpf_cnpj:
 *                     type: string
 *                     example: "12345678900"
 *                   tipo:
 *                     type: string
 *                     example: "F"
 *                   nascimento:
 *                      type: date
 *                      example: 01/01/2000
 *                   genereo:
 *                      type: string
 *                      example: "M"
 *                   telefone:
 *                      type: string
 *                      example: 31912345678
 *                   email:
 *                      type: string
 *                      example: joao@silva.com.br
 *                   status:
 *                      type: integer
 *                      example: 1
 *                   endereco:
 *                      type: string
 *                      example: Rua Julio Cesar
 *                   endereco_num:
 *                      type: integer
 *                      example: 100
 *                   endereco_comp:
 *                      type: string
 *                      example: Apto 306
 *                   endereco_bairro:
 *                      type: string
 *                      example: Imperadores
 *                   cidade:
 *                      type: string
 *                      example: Belo Horizonte
 *                   estado:
 *                      type: string
 *                      example: MG
 *                   pais:
 *                      type: string
 *                      example: Brasil
 *                   cep:
 *                      type: integer
 *                      example: 31000100
 *     responses:
 *       204:
 *        description: The resource was update successfully.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /pessoas/{id}/delete:
 *   delete:
 *     summary: Exclui uma pessoa individualmente
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da pessoa
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

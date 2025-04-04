const express = require("express");
const { getPets, createPet, getPetTypes } = require("../controllers/petController");
const router = express.Router();

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Retorna todos os pets
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de pets retornada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /pets/new-pet:
 *   post:
 *     summary: Cria um novo pet
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_cliente:
 *                 type: integer
 *                 example: 1
 *               nome:
 *                 type: string
 *                 example: "Rex"
 *               tipo:
 *                 type: string
 *                 example: "Cachorro"
 *               raca:
 *                 type: string
 *                 example: "Labrador"
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 example: "2020-01-15"
 *               observacoes:
 *                 type: string
 *                 example: "Muito brincalhão e adora passear."
 *     responses:
 *       201:
 *         description: Pet criado com sucesso.
 *       500:
 *         description: Erro ao criar pet.
 */

/**
  * @swagger
 * /pets/{id}/types:
 *   get:
 *     summary: Obtém os tipos de um pet
 *     description: Retorna a lista de tipos associados a um pet específico.
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pet.
 *     responses:
 *       200:
 *         description: Lista de tipos do pet.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                     description: ID do tipo de pet.
 *                   nome:
 *                     type: string
 *                     example: "doméstico"
 *                     description: Nome do tipo de pet.
 *                   descricao:
 *                     type: string
 *                     example: "Animal de estimação criado em ambiente familiar."
 *                     description: Descrição do tipo de pet.
 *       404:
 *         description: Pet não encontrado.
 *       500:
 *         description: Erro interno do servidor.

router.get("/", getPets);
router.post("/", createPet);
router.get("/:id/types", getPetTypes);

module.exports = router; 

router.put("/:id", updatePet);
router.delete("/:id", deletePet);
router.patch("/:id", patchPet);

/**
 * @swagger
 * /pets/{id}/updateput:
 *   put:
 *     summary: Atualiza um pet completamente
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Rex"
 *               especie:
 *                 type: string
 *                 example: "Cachorro"
 *               raca:
 *                 type: string
 *                 example: "Labrador"
 *               idade:
 *                 type: integer
 *                 example: 5
 *               dono_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Atualização bem-sucedida
 *       404:
 *         description: Pet não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /pets/{id}/updatepatch:
 *   patch:
 *     summary: Atualiza parcialmente um pet
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Novo nome do pet"
 *     responses:
 *       200:
 *         description: Atualização parcial bem-sucedida
 *       404:
 *         description: Pet não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /pets/{id}/delete:
 *   delete:
 *     summary: Deleta um pet pelo ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pet
 *     responses:
 *       200:
 *         description: Pet deletado com sucesso
 *       404:
 *         description: Pet não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
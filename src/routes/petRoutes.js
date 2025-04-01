const express = require("express");
const { getPets, createPet, getPetTypes, updatePet, deletePet, patchPet } = require("../controllers/petController");
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
 * /pets:
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
 *                 example: 3
 *               dono_id:
 *                 type: integer
 *                 example: 1
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
 *     description: Retorna a lista de tipos atribuídos a um pet específico.
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
 *         description: Lista de tipos do pet
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
 *                   type:
 *                     type: string
 *                     example: "doméstico"
 *       404:
 *         description: Pet não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

router.get("/", getPets);
router.post("/", createPet);
/* router.get("/:id/types", getPetTypes); */
router.put("/:id", updatePet);
router.delete("/:id", deletePet);
router.patch("/:id", patchPet);

module.exports = router; 
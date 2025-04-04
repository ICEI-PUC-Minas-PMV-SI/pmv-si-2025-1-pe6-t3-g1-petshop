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
 *         description: Erro ao buscar pets.
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
 *                 description: ID do cliente associado ao pet (obrigatório)
 *                 example: 1
 *               nome:
 *                 type: string
 *                 description: Nome do pet (obrigatório)
 *                 example: "Rex"
 *               tipo:
 *                 type: string
 *                 description: Tipo de animal (obrigatório)
 *                 example: "Cachorro"
 *               raca:
 *                 type: string
 *                 description: Raça do animal (obrigatório)
 *                 example: "Labrador"
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento do pet (AAAA-MM-DD) (obrigatório)
 *                 example: "2020-01-15"
 *               observacoes:
 *                 type: string
 *                 description: Observações adicionais sobre o pet
 *                 example: "Muito brincalhão e adora passear."
 *     responses:
 *       201:
 *         description: Pet criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pet criado com sucesso"
 *                 pet:
 *                   type: object
 *                   properties:
 *                     id_cliente:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       example: "Rex"
 *                     tipo:
 *                       type: string
 *                       example: "Cachorro"
 *                     raca:
 *                       type: string
 *                       example: "Labrador"
 *                     data_nascimento:
 *                       type: string
 *                       format: date
 *                       example: "2020-01-15"
 *                     observacoes:
 *                       type: string
 *                       example: "Muito brincalhão e adora passear."
 *       500:
 *         description: Erro ao criar pet.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao criar pet"
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
 *         description: Tipos não encontrados para o pet especificado.
 *       500:
 *         description: Erro ao buscar tipos do pet.

router.get("/", getPets);
router.post("/", createPet);
router.get("/:id/types", getPetTypes);

module.exports = router; 

router.put("/:id", updatePet);
router.delete("/:id", deletePet);
router.patch("/:id", patchPet);

/**
 * @swagger
 * /pets/{id}/update:
 *   put:
 *     summary: Atualiza completamente as informações de um pet pelo ID
 *     description: Atualiza os dados de um pet no banco de dados com base no ID fornecido. Todos os campos enviados no corpo serão substituídos.
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do pet a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_cliente
 *               - nome
 *               - tipo
 *               - raca
 *               - data_nascimento
 *               - observacoes
 *             properties:
 *               id_cliente:
 *                 type: integer
 *                 example: 1
 *                 description: ID do cliente dono do pet
 *               nome:
 *                 type: string
 *                 example: "Rex"
 *                 description: Nome do pet
 *               tipo:
 *                 type: string
 *                 example: "Cachorro"
 *                 description: Tipo do pet
 *               raca:
 *                 type: string
 *                 example: "Labrador"
 *                 description: Raça do pet
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 example: "2020-01-01"
 *                 description: Data de nascimento do pet (YYYY-MM-DD)
 *               observacoes:
 *                 type: string
 *                 example: "Nenhuma observação"
 *                 description: Observações sobre o pet
 *     responses:
 *       200:
 *         description: Pet atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pet atualizado com sucesso"
 *                 pet:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     id_cliente:
 *                       type: integer
 *                       example: 1
 *                       description: ID do cliente dono do pet
 *                     nome:
 *                       type: string
 *                       example: "Rex"
 *                       description: Nome do pet
 *                     tipo:
 *                       type: string
 *                       example: "Cachorro"
 *                       description: Tipo do pet
 *                     raca:
 *                       type: string
 *                       example: "Labrador"
 *                       description: Raça do pet
 *                     data_nascimento:
 *                       type: string
 *                       format: date
 *                       example: "2020-01-01"
 *                       description: Data de nascimento do pet (YYYY-MM-DD)
 *                     observacoes:
 *                       type: string
 *                       example: "Nenhuma observação"
 *                       description: Observações sobre o pet
 *       404:
 *         description: Pet não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Pet não encontrado"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao atualizar pet"
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
 *         description: Erro ao deletar pet
 */
const express = require("express");
const { getPets, createPet, getPet, updatePet, deletePet} = require("../controllers/petController");
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
 * /pets/id:
 *   get:
 *     summary: Busca um pet pelo ID ou nome
 *     description: Busca um pet no banco de dados pelo ID ou nome.
 *     tags: [Pets]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID do pet a ser buscado (opcional)
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome do pet a ser buscado (opcional)
 *     responses:
 *       200:
 *         description: Pet encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 id_cliente:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: "Rex"
 *                 tipo:
 *                   type: string
 *                   example: "Cachorro"
 *                 raca:
 *                   type: string
 *                   example: "Labrador"
 *                 data_nascimento:
 *                   type: string
 *                   format: date
 *                   example: "2020-01-01"
 *                 observacoes:
 *                   type: string
 *                   example: "Nenhuma observação"
 *       400:
 *         description: Requisição inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ID ou nome devem ser fornecidos."
 *       404:
 *         description: Pet não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pet com id={id} não encontrado."
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar pet."
 */


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
 *   patch:
 *     summary: Atualiza parcialmente as informações de um pet pelo ID
 *     description: Atualiza os campos nome e/ou observacoes de um pet no banco de dados com base no ID fornecido.
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
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Novo Nome"
 *                 description: Novo nome do pet (opcional)
 *               observacoes:
 *                 type: string
 *                 example: "Novas observações"
 *                 description: Novas observações sobre o pet (opcional)
 *     responses:
 *       204:
 *         description: Pet atualizado com sucesso (sem conteúdo retornado)
 *       404:
 *         description: Pet não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Não há pet com id={id}."
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
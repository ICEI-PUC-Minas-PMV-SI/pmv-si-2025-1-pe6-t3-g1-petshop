const express = require("express");
const { createSchedule, editSchedule, deleteSchedule, getSchedule } = require("../controllers/schedulingController");
const router = express.Router();
const tokenVerify = require("../middleware/tokenVerify")

/**
 * @swagger
 * /schedule/create:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Agendamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pessoa:
 *                 type: string
 *                 example: "Carlos Alberto"
 *               profissional:
 *                 type: string
 *                 example: "Guilherme Augusto"
 *               pet:
 *                 type: string
 *                 example: "Cachorro"
 *               data_agendamento:
 *                  type: date
 *                  example: 10/10/2025
 *               servico:
 *                  type: string
 *                  example: "Banho e tosa"
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso.
 *       500:
 *         description: Erro ao agendar.
 */

/**
 * @swagger
 * /schedule/update/{id}:
 *   patch:
 *     summary: Edita um agendamento
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         schema:
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pessoa:
 *                 type: string
 *                 example: "Carlos Alberto"
 *               profissional:
 *                 type: string
 *                 example: "Guilherme Augusto"
 *               pet:
 *                 type: string
 *                 example: "Cachorro"
 *               data_agendamento:
 *                  type: date
 *                  example: 10/10/2025
 *               servico:
 *                  type: string
 *                  example: "Banho e tosa"
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso.
 *       500:
 *         description: Erro ao agendar.
 */

/**
 * @swagger
 * /schedule/delete/{id}:
 *   delete:
 *     summary: Deleta um agendamento
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         schema:
 *         description: ID do usuário
 *     responses:
 *       201:
 *         description: Agendamento deletado com sucesso.
 *       500:
 *         description: Erro ao deletar agendamento.
 */
/**
 * @swagger
 * /schedule/get/{id}:
 *   get:
 *     summary: Procura por agendamentos
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         schema:
 *         description: ID do usuário
 *     responses:
 *       201:
 *         description: Agendamentos.
 *       500:
 *         description: Erro ao buscar agendamento.
 */


router.post("/schedule/create", createSchedule);
router.patch("/schedule/update/:id", editSchedule);
router.delete("/schedule/delete/:id", deleteSchedule);
router.get("/schedule/get/:id", getSchedule);


module.exports = router;

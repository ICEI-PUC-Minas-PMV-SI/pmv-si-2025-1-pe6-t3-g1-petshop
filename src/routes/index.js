const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./userSessionRoutes");
const faturaRoutes = require("./faturaRoutes");
const itensRoutes = require("./itensRoutes");
const pagamentoRoutes = require("./pagamentoRoutes");
const pessoaRoutes = require("./pessoaRoutes");
const scheduleRoutes = require("./scheduleRoutes");
const petRoutes = require("../routes/petRoutes");
const profissionalRoutes = require("../routes/profissionalRoutes");
const servicesRoutes = require("../routes/serviceRoutes");

const router = express.Router();

// Pedro
router.use("/", scheduleRoutes);

// Davi
router.use("/users", userRoutes);
router.use("/", authRoutes);

// Valdeir
router.use("/faturas", faturaRoutes);
router.use("/itens", itensRoutes);
router.use("/pagamentos", pagamentoRoutes);
router.use("/pessoas", pessoaRoutes);

// Fernanda 
router.use("/pets", petRoutes);

// Marcia
router.use("profissionais", profissionalRoutes);
router.use("services", servicesRoutes);

module.exports = router;

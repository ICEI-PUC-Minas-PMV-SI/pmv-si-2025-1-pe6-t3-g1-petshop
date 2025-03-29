const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./userSessionRoutes");
const faturaRoutes = require("./faturaRoutes");
const itensRoutes = require("./itensRoutes");
const pagamentoRoutes = require("./pagamentoRoutes");
const pessoaRoutes = require("./pessoaRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/", authRoutes);

router.use("/faturas", faturaRoutes);
router.use("/itens", itensRoutes);
router.use("/pagamentos", pagamentoRoutes);
router.use("/pessoas", pessoaRoutes);

module.exports = router;

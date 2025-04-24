// controllers/profissionalController.js
const Profissional = require('../models/profissionalModel');

// Buscar todos os profissionais
const getProfissionais = async (req, res) => {
  try {
    const profissionais = await Profissional.findAll();
    res.status(200).json(profissionais);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar profissionais" });
  }
};

// Criar um novo profissional
const createProfissional = async (req, res) => {
  try {
    const { nome, cargo } = req.body;
    const newProfissional = await Profissional.create({
      nome,
      cargo,
    });
    res.status(201).json({ message: "Profissional criado com sucesso", profissional: newProfissional });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar profissional" });
  }
};

module.exports = { getProfissionais, createProfissional };

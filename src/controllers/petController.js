const Pet = require("../models/petModel");

const getPets = async (_req, res) => {
  try {
    const Pets = await Pet.findAll();
    res.status(200).json(Pets); 
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pets" });
  }
};

const createPet = async (req, res) => {
  try {
    const { nome, tipo, raca, data_nascimento, observacoes, pessoa_id } = req.body; 
    
    const newPet = await Pet.create({
      nome,
      tipo,
      raca,
      data_nascimento,
      observacoes,
      pessoa_id
    });

    res.status(201).json({ message: "Pet criado com sucesso", pet: newPet }); 
  } catch (error) {
    console.error("Erro ao criar pet:", error);
    res.status(500).json({ error: "Erro ao criar pet" });
  }
};

const findSingle = async (req, res) => {
  try {
    const Pet = await Pet.findByPk(req.params.id);
    if (Pet) {
      res.status(200).json(Pet); 
    } else {
      res.status(404).send({ message: `Não há pet com id=${req.params.id}.` });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pet" });
  }
};

const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);

    if (pet) {
      const { nome, observacoes } = req.body;

      await pet.update({ 
        nome,
        observacoes
      });

      res.status(204).send();
    } else {
      res.status(404).send({ message: `Não há pet com id=${req.params.id}.` });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar pet" }); 
  }
};

const deletePet = async (req, res) => {
  try {
    const Pet = await Pet.findByPk(req.params.id);
    if (Pet) {
      await Pet.destroy(); 
      res.status(204).send();
    } else {
      res.status(404).send({ message: `Não há pet com id=${req.params.id}.` });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar pet" }); 
  }
};

module.exports = { getPets, createPet, findSingle, updatePet, deletePet };
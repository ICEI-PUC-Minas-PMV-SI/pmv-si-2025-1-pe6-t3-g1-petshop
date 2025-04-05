const Pet = require("../models/petModel");

module.exports = { getPets, createPet, getPet, getPetTypes, updatePet, deletePet };

const getPets = async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pets" });
  }
};

const createPet = async (req, res) => {
  try {
    const { nome, tipo, raca, data_nascimento, observacoes, id_pessoa } = req.body;
    const newPet = await Pet.create({ nome, tipo, raca, data_nascimento, observacoes, id_pessoa });
    res.status(201).json({ message: "Pet criado com sucesso", pet: newPet });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar pet" });
  }
};

const getPet = async (req, res) => {
  try {
    const { id, nome } = req.query;

    if (id) {
      // Buscar por ID
      const pet = await Pet.findByPk(id);

      if (pet) {
        res.status(200).json(pet);
      } else {
        res.status(404).json({ message: `Pet com id=${id} não encontrado.` });
      }
    } else if (nome) {
      // Buscar por nome
      const pet = await Pet.findOne({
        where: {
          nome: nome
        }
      });

      if (pet) {
        res.status(200).json(pet);
      } else {
        res.status(404).json({ message: `Pet com nome=${nome} não encontrado.` });
      }
    } else {
      // Nenhum parâmetro fornecido
      return res.status(400).json({ error: "ID ou nome devem ser fornecidos." });
    }
  } catch (error) {
    console.error("Erro ao buscar pet:", error);
    res.status(500).json({ error: "Erro ao buscar pet." });
  }
};
  

const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);

    if (pet) {
      const { nome, observacoes } = req.body;

      const updates = {};

      if (nome) {
        updates.nome = nome;
      }
      if (observacoes) {
        updates.observacoes = observacoes;
      }

      updates.updated_at = Date.now();

      await pet.update(updates);

      res.status(204).send();
    } else {
      res.status(404).send({ message: `Não há pet com id=${req.params.id}.` });
    }
  } catch (error) {
    console.error("Erro ao atualizar pet:", error);
    res.status(500).json({ error: "Erro ao atualizar pet" });
  }
};

const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Pet.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: "Pet deletado com sucesso" });
    } else {
      res.status(404).json({ error: "Pet não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar pet" });
  }
};
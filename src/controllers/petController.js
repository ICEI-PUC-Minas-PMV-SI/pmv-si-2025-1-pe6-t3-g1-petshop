const Pet = require("../models/petModel");
const User = require("../models/userModel");
const PetType = require("../models/PetTypeModel");


module.exports = { getPets, createPet, getPetTypes, updatePet, deletePet, patchPet };

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
    const { nome, tipo, raca, data_nascimento, observacoes, id_cliente } = req.body;
    const newPet = await Pet.create({ nome, tipo, raca, data_nascimento, observacoes, id_cliente });
    res.status(201).json({ message: "Pet criado com sucesso", pet: newPet });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar pet" });
  }
};
  
const getPetTypes = async (req, res) => {
  try {
    const petTypes = await PetType.findAll({
      where: { pet_id: req.params.id }
    });

    // Caso nenhum tipo seja encontrado, retorne 404
    if (!petTypes || petTypes.length === 0) {
      return res.status(404).json({ error: "Tipos não encontrados para o pet especificado." });
    }

    res.status(200).json(
      petTypes.map(pt => ({
        id: pt.id,
        nome: pt.nome,
        descricao: pt.descricao
      }))
    );
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tipos do pet." });
  }
};

const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Pet.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedPet = await Pet.findOne({ where: { id: id } });
      res.status(200).json({ message: "Pet atualizado com sucesso", pet: updatedPet });
    } else {
      res.status(404).json({ error: "Pet não encontrado" });
    }
  } catch (error) {
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
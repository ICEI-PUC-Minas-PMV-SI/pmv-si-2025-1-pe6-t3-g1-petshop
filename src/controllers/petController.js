const Pet = require("../models/petModel");
const User = require("../models/userModel");
const PetType = require("../models/petTypeModel");

const getPets = async (req, res) => {
  try {
    const pets = await Pet.findAll()();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pets" });
  }
};

const createPet = async (req, res) => {
  try {
    const { nome, especie, raca, idade, dono_id } = req.body;
    const newPet = await Pet.create(nome, especie, raca, idade, dono_id);
    res.status(201).json({ message: "Pet criado com sucesso", pet: newPet });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar pet" });
  }
};

const getPetTypes = async (req, res) => {
  try {
    const petTypes = await PetType.findAll({ pet_id: req.params.id }).populate("type_id");
    res.status(200).json(petTypes.map(pt => pt.type_id));
  } catch (error) {git
    res.status(500).json({ error: "Erro ao buscar tipos do pet" });
  }
};

module.exports = { getPets, createPet, getPetTypes };
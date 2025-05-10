const Pet = require("../models/petModel");

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
    const { nome, tipo, raca, data_nascimento, observacoes, pessoa_id } =
      req.body;
    const newPet = await Pet.create({
      nome,
      tipo,
      raca,
      data_nascimento,
      observacoes,
      pessoa_id,
    });
    res.status(201).json({ message: "Pet criado com sucesso", pet: newPet });
  } catch (error) {
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
    const updatedFields = req.body;
    const { id } = req.params;
    const [updated] = await Pet.update(
      {
        nome: updatedFields.nome,
        observacoes: updatedFields.observacoes,
      },
      {
        where: { id: id },
      }
    );
    if (updated) {
      const updatedPet = await Pet.findOne({ where: { id: id } });
      res
        .status(200)
        .json({ message: "Pet atualizado com sucesso", pet: updatedPet });
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
      where: { id: id },
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



module.exports = { getPets, createPet, updatePet, deletePet, findSingle };

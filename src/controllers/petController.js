const Pet = require("../models/petModel");

const getPets = async (req, res) => {
  try {
    const Pets = await Pet.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pets" });
  }
};

const createPet = async (req, res) => {
  try {
const { id, nome, tipo, raca, data_nascimento, observacoes, pessoa_id } = req.body;

const newPet = await Pet.create({
  id,
  nome,
  tipo,
  raca,
  data_nascimento,
  observacoes,
  pessoa_id
});

res.status(201).json({ message: "Pet criado com sucesso", user: newPet });
} catch (error) {
  console.error("Erro ao criar pet:", error);
  res.status(500).json({ error: "Erro ao criar pet" });
}
};

const findSingle
 = async (req, res) => {
  try {
    const Pet = await Pet.findByPk(req.params.id);
      if(Pet){
        res.status(200).json(pet);
      }else{
        res.status(404).send({message:  `Nao ha pet com id=${req.params.id}.`});
      }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pets" });
  }
};

const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);

    if (pet) {
      const { nome, observacoes } = req.body;

      pet.update({
        nome,
        observacoes
      });
      
      res.status(204).send();
    } else {
      res.status(404).send({ message: `Não há pet com id=${req.params.id}.` });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pet" });
  }
};

const deletePet = async (req, res) => {
  try {
    const Pet = await Pet.findByPk(req.params.id);
    if(Pet){
      pet.destroy();
      res.status(204).send();
    }else{
      res.status(404).send({message:  `Não ha pet com id=${req.params.id}.`});
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pets" });
  }
};

module.exports = { getPets, createPet, findSingle, updatePet, deletePet };

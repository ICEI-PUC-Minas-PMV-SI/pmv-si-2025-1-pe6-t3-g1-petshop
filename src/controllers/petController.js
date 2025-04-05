const Pet = require("../models/petModel");
const Pet = require("../models/petModel");

const getPets = async (req, res) =>{
  try{
    const getallPets = await Pet.findAll();
    res.status(200).json(message:getallPets)
  }
  catch (error){
    console.error({"Erro ao buscar pets"});
    res.status(500).json({ error: "Erro ao buscar testes" });
  }
};

const createPet = async (req, res) => {
  try {
const { id, nome, tipo, raca, data_nascimento, observacoes, id_pessoa } = req.body;

var pet_id = 1,
status = 1,
created_at = Date.now(),
updated_at = created_at;

const newPet = await Pet.create({
  id,
  nome,
  tipo,
  raca,
  data_nascimento,
  observacoes,
  pessoa_id,
  created_at,
  updated_at
});

res.status(201).json({ message: "Pet criado com sucesso", user: newPet });
} catch (error) {
  console.error("Erro ao criar pet:", error);
  res.status(500).json({ error: "Erro ao criar pet" });
}
};

const findSingle//antigo getpet
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

      const updated_at = Date.now();

      pet.update({
        nome,
        configuracoes,
        updated_at
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

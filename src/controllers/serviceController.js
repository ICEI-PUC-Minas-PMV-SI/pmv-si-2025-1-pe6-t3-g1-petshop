// controllers/serviceController.js
const Service = require("../models/serviceModel");
const Profissional = require("../models/profissionalModel");

const getServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: {
        model: Profissional,
        attributes: ["id", "nome"], 
      },
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar serviços" });
  }
};

const createService = async (req, res) => {
  try {
    const { titulo, descricao, preco, profissional_id } = req.body; 
    const newService = await Service.create({
      titulo, 
      descricao,
      preco,
      profissional_id,
    });
    res.status(201).json({ message: "Serviço criado com sucesso", service: newService });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar serviço" });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, preco, profissional_id } = req.body; 

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: "Serviço não encontrado" });
    }

    service.titulo = titulo || service.titulo; 
    service.descricao = descricao || service.descricao;
    service.preco = preco || service.preco;
    service.profissional_id = profissional_id || service.profissional_id;

    await service.save();
    res.status(200).json({ message: "Serviço atualizado com sucesso", service });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar serviço" });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ error: "Serviço não encontrado" });
    }

    await service.destroy();
    res.status(200).json({ message: "Serviço deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar serviço" });
  }
};

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService,
};

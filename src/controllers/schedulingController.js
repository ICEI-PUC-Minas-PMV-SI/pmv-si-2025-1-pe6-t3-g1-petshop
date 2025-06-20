const Scheduling = require("../models/schedulingModel");

const createSchedule = async (req, res) => {
  try {
    const { pessoa, profissional, pet, data_agendamento, servico } = req.body;

    const newSchedule = await Scheduling.create({
      pessoa,
      profissional,
      pet,
      data_agendamento,
      servico
    });

    res.status(201).json({ message: "Agendado com sucesso", schedule: newSchedule });
  } catch (error) {
    console.error("Erro ao agendar:", error);
    res.status(500).json({ error: "Erro ao agendar" });
  }
};

const editSchedule = async (req, res) => {
  try {
    const id = req.params;
    const updateFields = req.body;
    const desiredSchedule = await Scheduling.findByPk(
      id.id
    );
    await desiredSchedule.update({
      pessoa: updateFields.pessoa,
      profissional: updateFields.profissional,
      pet: updateFields.pet,
      servico: updateFields.servico,
      data_agendamento: updateFields.data_agendamento,
    });

    res.status(201).json({ message: "Atualizado com sucesso", schedule: desiredSchedule});
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    res.status(500).json({ error: "Erro ao atualizar" });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const id = req.params;
    const desiredSchedule = await Scheduling.findByPk(
      id.id);
    await desiredSchedule.destroy()

    res.status(201).json({ message: "Deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar:", error);
    res.status(500).json({ error: "Erro ao deletar" });
  }
};

const getAllSchedules = async (req, res) => {
  try {
    {
    const getAllSchedules = await Scheduling.findAll()
    res.status(201).json( getAllSchedules ); //retirado {}
  }
  } catch (error) {
    console.error("Erro ao buscar", error);
    res.status(500).json({ error: "Erro ao buscar" });
  }

};

const getScheduleById = async (req, res) => {
  try {
    if (Number.isInteger(Number(req.params.id)))  {
    const desiredSchedule = await Scheduling.findByPk(
      req.params.id);
      if (!desiredSchedule){
        throw new Error ("Id não existente")
      }
      res.status(201).json( desiredSchedule ); //retirado {}
    }
  
  } catch (error) {
    console.error("Erro ao buscar", error);
    res.status(500).json({ error: "Erro ao buscar" });
  }

};
module.exports = { createSchedule, editSchedule, deleteSchedule, getAllSchedules, getScheduleById }

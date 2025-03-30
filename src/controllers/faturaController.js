const Fatura = require("../models/faturaModel");

const findSingle = async (req, res) => {
    try {
      const fatura = await Fatura.findByPk(req.params.id);
        if(fatura){
          res.status(200).json(fatura);
        }else{
          res.status(404).send({message:  `Nao ha fatura com id=${req.params.id}.`});
        }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar faturas" });
    }
  };
  
const findAll = async (req, res) => {
    try {
      const faturas = await Fatura.findAll();
      res.status(200).json(faturas);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar faturas" });
    }
  };

  const create = async (req, res) => {
    try {
      const { pessoa_id, desconto, pagamento_id } = req.body;

      var user_id = 1,
      status = 'A',
      valor = 0,
      created_at = Date.now(),
      updated_at = created_at;

      const newFatura = await Fatura.create({
        pessoa_id,
        user_id ,
        desconto,
        valor,
        status,
        pagamento_id,
        created_at,
        updated_at
      });
  
  
      res.status(201).json({ message: "Fatura criada com sucesso", user: newFatura });
    } catch (error) {
      console.error("Erro ao criar fatura:", error);
      res.status(500).json({ error: "Erro ao criar fatura" });
    }
  };

  const updateSingle = async (req, res) => {
    try {
      const fatura = await Fatura.findByPk(req.params.id);
      if(fatura){
        const { pessoa_id, desconto, pagamento_id } = req.body;

        const updated_at = Date.now();

        fatura.update({
          pessoa_id,
          desconto,
          pagamento_id,
          updated_at
        });

        res.status(204).send();
      }else{
        res.status(404).send({message:  `Não ha fatura com id=${req.params.id}.`});
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar faturas" });
    }
  };

  const deleteSingle = async (req, res) => {
    try {
      const fatura = await Fatura.findByPk(req.params.id);
      if(fatura){
        fatura.destroy();
        res.status(204).send();
      }else{
        res.status(404).send({message:  `Não ha fatura com id=${req.params.id}.`});
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar faturas" });
    }
  };

  module.exports = { findAll, create, findSingle, updateSingle, deleteSingle};
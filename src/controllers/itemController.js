const Item = require("../models/itensModel");

const findSingle = async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id);
        if(item){
          res.status(200).json(item);
        }else{
          res.status(404).send({message:  `Nao ha item com id=${req.params.id}.`});
        }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar itens" });
    }
  };
  
const findAll = async (req, res) => {
    try {
      const itens = await Item.findAll();
      res.status(200).json(itens);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar itens" });
    }
  };

  const create = async (req, res) => {
    try {
        const { fatura_id, quantidade } = req.body;

        const servico = req.body.servico ?? 0;
        const produto_id = req.body.produto_id ?? 0;
        const servico_id = req.body.servico_id ?? 0;

      const newItem = await Item.create({
        fatura_id,
        servico,
        produto_id,
        servico_id,
        quantidade
      });
  
      res.status(201).json({ message: "Item criado com sucesso", user: newItem });
    } catch (error) {
      console.error("Erro ao criar iten:", error);
      res.status(500).json({ error: "Erro ao criar item" });
    }
  };

  const updateSingle = async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id);
      if(item){
        const { quantidade } = req.body;

        item.update({quantidade});

        res.status(204).send();
      }else{
        res.status(404).send({message:  `Não ha item com id=${req.params.id}.`});
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar itens" });
    }
  };

  const deleteSingle = async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id);
      if(item){
        item.destroy();
        res.status(204).send();
      }else{
        res.status(404).send({message:  `Não ha item com id=${req.params.id}.`});
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar itens" });
    }
  };

  module.exports = { findAll, create, findSingle, updateSingle, deleteSingle};
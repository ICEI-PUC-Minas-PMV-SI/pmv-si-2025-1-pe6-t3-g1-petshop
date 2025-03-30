const Pagamento = require("../models/pagamentoModel");

const findSingle = async (req, res) => {
    try {
      const pagamento = await Pagamento.findByPk(req.params.id);
        if(pagamento){
          res.status(200).json(pagamento);
        }else{
          res.status(404).send({message:  `Nao ha pagamento com id=${req.params.id}.`});
        }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar pagamentos" });
    }
  };
  
const findAll = async (req, res) => {
    try {
      const pagamentos = await Pagamento.findAll();
      res.status(200).json(pagamentos);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar pagamentos" });
    }
  };

  const create = async (req, res) => {
    try {
      const { titulo, descricao, condicao} = req.body;

    var created_at = Date.now(),
      updated_at = created_at;

      const newPagamento = await Pagamento.create({
        titulo,
        descricao,
        condicao,
        created_at,
        updated_at
      });
  
  
      res.status(201).json({ message: "Pagamento criado com sucesso", user: newPagamento });
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);
      res.status(500).json({ error: "Erro ao criar pagamento" });
    }
  };


  const updateSingle = async (req, res) => {
    try {
      const pagamento = await Pagamento.findByPk(req.params.id);
      if(pagamento){
        const { titulo, descricao, condicao } = req.body;

        const updated_at = Date.now();

        pagamento.update({
         titulo,
         descricao,
         condicao,
         updated_at
        });

        res.status(204).send();
      }else{
        res.status(404).send({message:  `Não ha pagamento com id=${req.params.id}.`});
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar itens" });
    }
  };

  const deleteSingle = async (req, res) => {
    try {
      const pagamento = await Pagamento.findByPk(req.params.id);
      if(pagamento){
        pagamento.destroy();
        res.status(204).send();
      }else{
        res.status(404).send({message:  `Não ha pagamento com id=${req.params.id}.`});
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar itens" });
    }
  };

  module.exports = { findAll, create, findSingle, updateSingle, deleteSingle};
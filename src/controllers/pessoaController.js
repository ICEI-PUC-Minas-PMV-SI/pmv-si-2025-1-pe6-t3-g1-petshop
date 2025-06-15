const Pessoa = require("../models/pessoaModel");


  const teste = async (req, res) => {
    try {
        console.log('teste ate aqui');
        res.status(200).send("Online");
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar pessoas" });
    }
  };

const findSingle = async (req, res) => {
    try {
      const pessoa = await Pessoa.findByPk(req.params.id);
        //console.log(pessoa);
        if(pessoa){
          res.status(200).json(pessoa);
        }else{
          res.status(404).send({message:  `Nao ha pessoa com id=${req.params.id}.`});
        }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar pessoas" });
    }
  };
  
const findAll = async (req, res) => {
    try {
      const pessoas = await Pessoa.findAll();
      res.status(200).json(pessoas);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar pessoas" });
    }
  };

  const create = async (req, res) => {
    try {
      console.log(req)
      const { nome, cpf_cnpj, tipo, nascimento, genero, telefone, email, endereco, endereco_num, endereco_bairro, cidade, estado, pais, cep } = req.body;

      var user_id = 1,
      status = 1,
      created_at = Date.now(),
      updated_at = created_at;

      const newPessoa = await Pessoa.create({
        nome,
        cpf_cnpj,
        tipo,
        nascimento,
        genero,
        telefone,
        email,
        status,
        endereco,
        endereco_num,
        endereco_bairro,
        cidade,
        estado,
        pais,
        cep,
        user_id,
        created_at,
        updated_at
      });
  
  
      res.status(201).json({ message: "Pessoa criada com sucesso", user: newPessoa });
    } catch (error) {
      console.error("Erro ao criar pessoa:", error);
      res.status(500).json({ error: "Erro ao criar pessoa" });
    }
  };

  const updateSingle = async (req, res) => {
    try {
      const pessoa = await Pessoa.findByPk(req.params.id);
      if(pessoa){
        const { nome, cpf_cnpj, tipo, nascimento, genero, telefone, email, status, endereco, endereco_num, endereco_bairro, cidade, estado, pais, cep } = req.body;

        const updated_at = Date.now();

        pessoa.update({
          nome,
          cpf_cnpj,
          tipo,
          nascimento,
          genero,
          telefone,
          email,
          status,
          endereco,
          endereco_num,
          endereco_bairro,
          cidade,
          estado,
          pais,
          cep,
          updated_at
        });

        res.status(204).send();
      }else{
        res.status(404).send({message:  `Não ha pessoa com id=${req.params.id}.`});
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar itens" });
    }
  };

  const deleteSingle = async (req, res) => {
    try {
      const pessoa = await Pessoa.findByPk(req.params.id);
      if(pessoa){
        pessoa.destroy();
        res.status(204).send();
      }else{
        res.status(404).send({message:  `Não ha pessoa com id=${req.params.id}.`});
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar pessoas" });
    }
  };

  module.exports = { findAll, create, findSingle, updateSingle, deleteSingle};
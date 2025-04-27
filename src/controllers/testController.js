const Test = require("../models/testModel");


const getTests = async (req, res) => {
    try {
        const getAllTests = await Test.findAll()
        res.status(200).json({message: getAllTests})
    }
    catch(error){
        console.error("Erro ao buscar testes:", error);
        res.status(500).json({ error: "Erro ao buscar testes" });
    }
};

module.exports = { getTests }
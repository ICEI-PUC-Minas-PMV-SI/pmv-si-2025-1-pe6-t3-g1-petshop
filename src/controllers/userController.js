const User = require("../models/userModel");
const UserRole = require("../models/userRoleModel");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

const createUser = async (req, res) => {
  try {
    const { nome, email, senha_hash, telefone } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha_hash, saltRounds);

    const newUser = await User.create({
      nome,
      email,
      senha_hash: hashedPassword,
      telefone
    });

    res.status(201).json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};


const getRoles = async (req, res) => {
  try {
    const userRoles = await UserRole.find({ user_id: req.params.id }).populate("role_id");
    res.status(200).json(userRoles.map(ur => ur.role_id));
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar roles do usuário" });
  }
};

module.exports = { getUsers, createUser, getRoles };

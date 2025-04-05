const User = require("../models/userModel");
const UserRole = require("../models/userRoleModel");
const Role = require("../models/roleModel");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

const createUser = async (req, res) => {
  try {
    const { nome, email, senha, telefone, role_id } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const newUser = await User.create({
      nome,
      email,
      senha_hash: hashedPassword,
      telefone,
    });

    const role = await Role.findByPk(role_id);
    if (!role) {
      return res.status(400).json({ error: "Role inválido" });
    }

    await UserRole.create({
      user_id: newUser.id,
      role_id,
    });

    res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });

    if (user) await user.destroy();

    res.status(200).json({ message: "Usuário deletado com sucesso", user: user });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};

const editUser = async (req, res) => {
  try {
    const updatedFields = req.body;
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user)
      await user.update({
        nome: updatedFields.nome,
        email: updatedFields.email,
        senha_hash: updatedFields.senha,
        telefone: updatedFields.telefone,
      });

    res.status(201).json({ message: "Usuário editado com sucesso" });
  } catch (error) {
    console.error("Erro ao editar o usuário:", error);
    res.status(500).json({ error: "Erro ao editar o usuário" });
  }
};

const getRoles = async (req, res) => {
  try {
    const userRole = await UserRole.findAll({
      where: { user_id: req.params.id },
      include: [{ model: Role, as: "role" }],
    });

    if (!userRole)
      return res.status(404).json({ error: "Usuário não encontrado" });

    const user_role = userRole[0].role_id;

    res.status(200).json(user_role);
  } catch (error) {
    console.error("Erro ao buscar roles do usuário:", error);
    res.status(500).json({ error: "Erro ao buscar roles do usuário" });
  }
};

module.exports = { getUsers, createUser, getRoles, deleteUser, editUser };

const User = require("../models/userModel");
const UserRole = require("../models/userRoleModel");
const Role = require("../models/roleModel");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["senha_hash"] },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro em getUsers:", error);
    res.status(500).json({ error: "Erro interno ao buscar usuários" });
  }
};

const createUser = async (req, res) => {
  try {
    const { nome, email, senha, telefone, role_id } = req.body;

    if (!nome || !email || !senha || !telefone || !role_id) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "E-mail inválido" });
    }

    if (!senhaRegex.test(senha)) {
      return res.status(400).json({
        error:
          "A senha deve ter no mínimo 8 caracteres, com letras maiúsculas, minúsculas e um caractere especial.",
      });
    }

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(409).json({ error: "E-mail já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = await User.create({
      nome,
      email,
      senha_hash: hashedPassword,
      telefone,
    });

    const role = await Role.findByPk(role_id);
    if (!role) {
      return res.status(400).json({ error: "ID de Role inválido" });
    }

    await UserRole.create({
      user_id: newUser.id,
      role_id,
    });

    const userData = newUser.get({ plain: true });
    delete userData.senha_hash;

    res
      .status(201)
      .json({ message: "Usuário criado com sucesso", userId: userData });
  } catch (error) {
    console.error("Erro em createUser:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const userData = user.get({ plain: true });
    delete userData.senha_hash;

    await user.destroy();
    res
      .status(200)
      .json({ message: "Usuário deletado com sucesso", user: userData });
  } catch (error) {
    console.error("Erro em deleteUser:", error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, senha } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const userRole = await UserRole.findOne({
      where: { user_id: user.id, role_id: 2 },
    });

    if (!userRole) {
      return res
        .status(403)
        .json({ error: "Usuário não possui permissão para edição" });
    }

    const updates = { nome, email, telefone };
    if (senha) updates.senha_hash = await bcrypt.hash(senha, 10);

    const userData = user.get({ plain: true });
    delete userData.senha_hash;

    await user.update(updates);

    res
      .status(200)
      .json({ message: "Usuário atualizado com sucesso", user: userData });
  } catch (error) {
    console.error("Erro em editUser:", error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

const getRoles = async (req, res) => {
  try {
    const { id } = req.params;

    const userRoles = await UserRole.findAll({
      where: { user_id: id },
      include: [{ model: Role, as: "role" }],
    });

    if (!userRoles || userRoles.length === 0) {
      return res
        .status(404)
        .json({ error: "Usuário ou roles não encontrados" });
    }

    const roles = userRoles.map((ur) => ur.role);
    res.status(200).json(roles);
  } catch (error) {
    console.error("Erro em getRoles:", error);
    res.status(500).json({ error: "Erro ao buscar roles do usuário" });
  }
};

const editPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { senhaAtual, novaSenha } = req.body;

    if (!senhaAtual || !novaSenha) {
      return res
        .status(400)
        .json({ error: "Senha atual e nova senha são obrigatórias" });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senhaAtual, user.senha_hash);
    if (!senhaValida) {
      return res.status(401).json({ error: "Senha atual incorreta" });
    }

    const novaSenhaHash = await bcrypt.hash(novaSenha, 10);
    await user.update({ senha_hash: novaSenhaHash });

    res.status(200).json({ message: "Senha atualizada com sucesso" });
  } catch (error) {
    console.error("Erro em editPassword:", error);
    res.status(500).json({ error: "Erro ao alterar a senha" });
  }
};

module.exports = {
  getUsers,
  createUser,
  getRoles,
  deleteUser,
  editUser,
  editPassword,
};

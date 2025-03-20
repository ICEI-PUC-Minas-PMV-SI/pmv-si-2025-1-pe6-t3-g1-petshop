const jwt = require("jsonwebtoken");
const UserSession = require("../models/userSessionModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();


const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

    const isMatch = await bcrypt.compare(senha, user.senha_hash);
    if (!isMatch) return res.status(401).json({ error: "Credenciais inválidas" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login bem-sucedido", token });
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    res.status(500).json({ error: "Erro ao autenticar usuário" });
  }
};


const logoutUser = async (req, res) => {
  try {
    await UserSession.deleteOne({ token: req.token });
    res.status(200).json({ message: "Logout realizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer logout" });
  }
};

module.exports = { loginUser, logoutUser };

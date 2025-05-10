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
    if (!isMatch)
      return res.status(401).json({ error: "Credenciais inválidas" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    const userSession = await UserSession.create({
      user_id: user.id,
      token,
      expires_at: expiresAt,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: expiresAt,
    });

    res
      .status(200)
      .json({
        message: "Login bem-sucedido",
        token,
        "Sua sessão expira em:": userSession.expiresAt,
      });
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    res.status(500).json({ error: "Erro ao autenticar usuário" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) return res.status(400).json({ error: "Token não encontrado" })

    await UserSession.destroy({ where: { token } })

    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'strict',
    })

    res.status(200).json({ message: "Logout realizado com sucesso" })
  } catch (error) {
    console.error("Erro no logout:", error)
    res.status(500).json({ error: "Erro ao fazer logout" })
  }
}

const getMe = async (req, res) => {
  try {
    const userId = req.user.id
    res.status(200).json({ id: userId })
  } catch (error) {
    console.error("Erro em getMe:", error)
    res.status(500).json({ error: "Erro ao recuperar usuário autenticado" })
  }
}



module.exports = { loginUser, logoutUser, getMe };

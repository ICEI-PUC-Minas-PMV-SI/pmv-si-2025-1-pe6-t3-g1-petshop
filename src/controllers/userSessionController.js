const jwt = require("jsonwebtoken");
const UserSession = require("../models/userSessionModel");
const User = require("../models/userModel");

const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

    const isMatch = await user.autenticar(senha);
    if (!isMatch) return res.status(401).json({ error: "Credenciais inválidas" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    const session = new UserSession({ user_id: user._id, token, expires_at: expiresAt });
    await session.save();

    res.status(200).json({ message: "Login bem-sucedido", token });
  } catch (error) {
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

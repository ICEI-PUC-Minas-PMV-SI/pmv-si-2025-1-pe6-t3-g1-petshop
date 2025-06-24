require("dotenv").config();
const sequelize = require("./config/database");
const Pessoa = require("./models/pessoaModel");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("🔌 Conectado ao banco");

    // só altera a tabela 'pessoas' pra ficar igual ao model
    await Pessoa.sync({ alter: true });
    console.log("✅ Tabela 'pessoas' sincronizada");

    process.exit(0);
  } catch (err) {
    console.error("❌ Erro ao sincronizar Pessoa:", err);
    process.exit(1);
  }
})();

const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Conectado ao PostgreSQL via Sequelize"))
  .catch((err) => console.error("Erro ao conectar ao banco:", err));


/*sequelize
  .sync({ force: true }) 
  .then(() => console.log("Tabelas sincronizadas com o banco de dados"))
  .catch((err) => console.error("Erro ao sincronizar tabelas:", err));*/




module.exports = sequelize;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const routes = require("./routes/index.js");
const swaggerDocs = require("./config/swagger.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno do servidor" });
});

app.get("/", (req, res) => {
  res.send("Valdeir dono do rei do pastel, socio do Davi, Fernanda testando");
});

swaggerDocs(app);


module.exports = app;

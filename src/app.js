const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const allowed = [
  "http://localhost:3000",
  "exp://192.168.0.130:8081"
];

const routes = require("./routes/index.js");
const swaggerDocs = require("./config/swagger.js");

const app = express();

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.json());
app.use(cors({
  origin: allowed,
  credentials: true
}));
app.options("*", cors({ origin: allowed, credentials: true }));

app.use(morgan("dev"));

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno do servidor" });
});



swaggerDocs(app);


module.exports = app;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pessoa = sequelize.define(
    "Pessoa",
    {},);
  
  module.exports = Pessoa;
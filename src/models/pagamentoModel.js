const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/database");

const Pagamentos = sequelize.define(
    "Pagamentos",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      condicao: {
        type: DataTypes>INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },{
      tableName: "forma_pagto",
      timestamps: false,
    }
  );
  
  module.exports = Pagamentos;
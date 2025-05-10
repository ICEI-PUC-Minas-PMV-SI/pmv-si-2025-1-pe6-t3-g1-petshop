const { DataTypes } = require("sequelize");
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
        type: DataTypes.INTEGER,
        allowNull: false,
      }
      
    },  {
      tableName: "forma_pagto",
      timestamps: true, 
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  
  module.exports = Pagamentos;
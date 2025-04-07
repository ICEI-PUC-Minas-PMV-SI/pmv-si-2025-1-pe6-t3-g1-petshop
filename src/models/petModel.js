const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Pessoa = require("../models/pessoaModel")

const Pet = sequelize.define(
    "Pet",
{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      pessoa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Pessoa,
          key: 'id'
        },
        onDelete: "CASCADE",
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      raca: {
        type: DataTypes.STRING,
        allowNull: false
      },
      data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      observacoes: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, 
    {
      tableName: "pet",
      timestamps: false,
    }
    );
    module.exports = Pet;
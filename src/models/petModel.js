const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pet = sequelize.define(
    "Pet",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        type: DataTypes.DATE,
        allowNull: false
      },
      observacoes: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pessoa_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      tableName: "Pet",
      timestamps: false,
    }
);

module.exports = Pet;
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FaturaItens = sequelize.define(
    "FaturaItens",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fatura_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      servico: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      produto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      servico_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantidade: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      }
    },{
      tableName: "fatura_itens",
      timestamps: false,
    }
  );
  
  module.exports = FaturaItens;
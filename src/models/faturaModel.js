const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Fatura = sequelize.define(
    "Fatura",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pessoa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desconto: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      valor: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pagamento_id: {
        type: DataTypes.INTEGER,
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
      tableName: "faturas",
      timestamps: false,
    }
  );
  
  module.exports = Fatura;
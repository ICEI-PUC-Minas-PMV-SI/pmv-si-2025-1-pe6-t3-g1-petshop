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
      }
    },{
      tableName: "faturas",
      timestamps: true, 
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  
  module.exports = Fatura;
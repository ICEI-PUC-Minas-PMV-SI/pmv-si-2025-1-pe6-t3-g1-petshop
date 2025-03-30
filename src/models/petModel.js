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
      id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Clientes',
          key: 'id_cliente'
        }
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
      tableName: "Pet",
      timestamps: false,
    }
    );
  
    module.exports = Pet;
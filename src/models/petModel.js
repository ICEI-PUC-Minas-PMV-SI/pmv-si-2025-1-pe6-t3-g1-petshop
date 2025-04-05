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
  
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      pessoa_id: { // pessoa_id como foreignKey
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: {
          model: 'pessoas', // Nome da tabela que está referenciando
          key: 'pessoa_id'   // Nome da coluna na tabela de pessoas que está referenciando
        },
        onUpdate: 'CASCADE', // Opcional: O que acontece quando o ID da pessoa é atualizado
        onDelete: 'CASCADE'  // Opcional: O que acontece quando a pessoa é deletada
      }
    },

      nome: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      tipo: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      raca: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      observacoes: {
        type: DataTypes.TEXT,
        allowNull: false,

        created_at: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
      },
    
      tableName: "Pet",
      timestamps: false,
    
    );
  
    module.exports = Pet;
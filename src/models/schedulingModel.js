const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Scheduling = sequelize.define(
    "Scheduling",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      pessoa: {
        type: DataTypes.STRING,
        allowNull: false, //    REFERENCIA PESSOA "DONO"
      },
      profissional: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pet: {
        type: DataTypes.STRING,
        allowNull: false, //    REFERENCIA PET
      },
      servico: {
        type: DataTypes.STRING,
        allowNull: false, //   PODE SER TEXTO OU REFERENCIA A SERVIÇO CASO SEJA NECESSÁRIO VISUALIZAR SERVIÇOS
      },
      data_agendamento: {
        type: DataTypes.DATE,
      }
      /*status: {
        type: DataTypes.BOOL,
        allowNull: false,
      },*/
  
    },
    {
      tableName: "scheduling",
      timestamps: false, 
    }
  );
  module.exports = Scheduling
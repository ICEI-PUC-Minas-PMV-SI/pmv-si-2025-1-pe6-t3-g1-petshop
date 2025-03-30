// models/serviceModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Profissional = require("./profissionalModel");

const Service = sequelize.define(
  "Service",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    profissional_id: {
      type: DataTypes.UUID,
      references: {
        model: Profissional,
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    tableName: "services",
    timestamps: false,
  }
);

Service.belongsTo(Profissional, { foreignKey: "profissional_id" });
Profissional.hasMany(Service, { foreignKey: "profissional_id" });

module.exports = Service;

// models/serviceModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Profissional = require("./profissionalModel");

const Service = sequelize.define(
  "Service",
  {
    id: {
<<<<<<< HEAD
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
=======
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
>>>>>>> 101cd35693b34708b56f4b50303526e50490d03c
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
<<<<<<< HEAD
      type: DataTypes.UUID,
=======
      type: DataTypes.INTEGER,
>>>>>>> 101cd35693b34708b56f4b50303526e50490d03c
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

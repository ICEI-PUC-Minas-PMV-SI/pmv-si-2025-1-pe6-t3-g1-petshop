// models/profissionalModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profissional = sequelize.define('Profissional', {
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
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
<<<<<<< HEAD
  },
  data_criacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'profissionais',
  timestamps: false, 
=======
  }
}, {
  tableName: 'profissionais',
  timestamps: true, 
  createdAt: "created_at"
>>>>>>> 101cd35693b34708b56f4b50303526e50490d03c
});

module.exports = Profissional;

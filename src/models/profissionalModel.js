// models/profissionalModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profissional = sequelize.define('Profissional', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'profissionais',
  timestamps: true, 
  createdAt: "created_at"
});

module.exports = Profissional;

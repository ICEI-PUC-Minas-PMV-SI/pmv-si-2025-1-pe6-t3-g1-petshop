const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("../models/userModel");

const Pessoa = sequelize.define(
  "Pessoa",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf_cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endereco_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    endereco_comp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    endereco_bairro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pais: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cep: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
     onDelete: "SET NULL",
    },
  },
  {
    tableName: "pessoas",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Pessoa.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

User.hasOne(Pessoa, {
  foreignKey: "user_id",
  as: "pessoa",
});

module.exports = Pessoa;

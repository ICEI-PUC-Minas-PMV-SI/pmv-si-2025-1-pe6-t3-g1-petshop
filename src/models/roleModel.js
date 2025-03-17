const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descricao: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "roles",
    timestamps: false, 
  }
);

Role.prototype.listarPermissoes = function () {
  return `Permissões da role ${this.nome}`;
};

module.exports = Role;

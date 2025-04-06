const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");

const UserSession = sequelize.define(
  "UserSession",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    tableName: "user_sessions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

UserSession.prototype.validarSessao = function () {
  return new Date() < this.expires_at;
};

module.exports = UserSession;

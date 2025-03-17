const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");

const UserSession = sequelize.define(
  "UserSession",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "user_sessions",
    timestamps: false,
  }
);

UserSession.prototype.validarSessao = function () {
  return new Date() < this.expires_at;
};

module.exports = UserSession;

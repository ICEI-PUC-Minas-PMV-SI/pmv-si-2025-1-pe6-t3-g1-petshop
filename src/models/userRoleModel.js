const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");
const Role = require("./userModel");

const UserRole = sequelize.define(
  "UserRole",
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
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "user_roles",
    timestamps: false,
  }
);

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "user_id",
  otherKey: "role_id",
  as: "roles",
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "role_id",
  otherKey: "user_id",
  as: "users",
});

module.exports = UserRole;

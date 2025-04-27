const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Test = sequelize.define(
    "Test", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        exemplo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
    },
    {
        tableName: "test",
        timestamps: false,
    }
);

module.exports = Test;
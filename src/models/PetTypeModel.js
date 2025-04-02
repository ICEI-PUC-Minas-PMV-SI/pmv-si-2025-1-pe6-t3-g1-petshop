const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PetType = sequelize.define(
  "PetType",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: "PetTypes",
    timestamps: false,
  }
);

// Definindo a associação com o modelo Pet
PetType.associate = (models) => {
  PetType.belongsToMany(models.Pet, { 
    through: 'PetPetTypes',
    foreignKey: 'type_id',
    otherKey: 'pet_id'
  });
};

module.exports = PetType;
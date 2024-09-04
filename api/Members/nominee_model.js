const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");

const Member = require("./member-model"); 

class Nominee extends Model {
  
}

Nominee.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    relationship: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    name2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    relationship2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    
  },
  {
    sequelize,
    modelName: "Nominee",
    tableName: "nominees",
    timestamps: true, 
    underscored: true 
  }
);




module.exports = Nominee;

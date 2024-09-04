const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/db");


class Password extends Model {
  
}

Password.init(
  {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey:true,
        autoIncrement:true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    via:{
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  }
   

  },
  {
    sequelize,
    modelName: "otpverify",
    tableName: "otpverify",
    timestamps: false,
  }
);

module.exports = Password;

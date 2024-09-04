const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/db");
const Member=require('../../Members/member-model');


class Donation extends Model {
}

Donation.init(
  {
  member_id:{
    type:DataTypes.BIGINT,
    allowNull:false,
    unique:true,
    references:{
      model:"members",
      key:"id",
    }
  },
  total_donation_received:{
    type:DataTypes.DECIMAL(10,2),
    allowNull:false,
    defaultValue:0,
  },
  bank_detail:{
    type:DataTypes.JSON,
    allowNull:true,
  },
  upi_id:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  upi_number:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  start_date:{
    type:DataTypes.DATE,
    allowNull:false,
  },
  end_date:{
    type:DataTypes.DATE,
    allowNull:false,
  },
  file:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  status:{
        type:DataTypes.ENUM('Active','Inactive'),
        allowNull:true,
        defaultValue:'Active',
   }
  },
  {
    sequelize,
    modelName: "Donation_Receiver",
    tableName: "donation_Receives",
    timestamps: true, 
    underscored: true 
  }
);
Donation.belongsTo(Member, { foreignKey: 'member_id' });

module.exports = Donation;

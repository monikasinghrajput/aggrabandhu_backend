const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/db");
const Member=require('../../Members/member-model');
const DonationReceives=require('../DonationReceive/donationReceiverModel');

class Donation extends Model {
  
}

Donation.init(
  {
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'members',
        key: 'id'
      },
      onDelete:'CASCADE',
    },
    donation_id: { 
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    donation_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    transaction_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    transaction_file: {
      type: DataTypes.STRING,
      allowNull: true
    },
    payment_method:{
      type:DataTypes.STRING,
      allowNull:false
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
      allowNull: true,
      defaultValue: 'Approved'
    }
  },
  {
    sequelize,
    modelName: "Donation",
    tableName: "donations",
    timestamps: true,
    underscored: true
  }
);

Donation.belongsTo(Member, { foreignKey: 'member_id' });
// Donation.belongsTo(DonationReceives, { foreignKey: 'donation_id' });

module.exports = Donation;

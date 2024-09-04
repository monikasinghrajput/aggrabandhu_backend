const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");
const Member = require('../Members/member-model'); // Adjust path as needed

class Role extends Model {}

Role.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        member_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'members', // table name   matches the table name in your database
                key: 'id'
            },
           onDelete: 'CASCADE'
        },
        memberrole: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        newsrole: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        donationrole: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        userrole: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: "Role",
        tableName: "role", // Use plural form for consistency
        timestamps: true,
    }
);





module.exports = Role;

const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");


class Notification extends Model {
   
}

Notification.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        title :{
            type: DataTypes.STRING(255),
            allowNull:false,
        },
        content :{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        file:{
            type:DataTypes.STRING(500),
            allowNull:true,
        },
    },
    {
        sequelize,
        modelName: "Notification",
        tableName: "notification",
        timestamps: true,
    }
)

module.exports=Notification;
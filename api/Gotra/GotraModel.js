const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");


class Gotra extends Model {
   
}

Gotra.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name :{
            type: DataTypes.STRING(255),
            allowNull:false,
            unique:true
        },
    },
    {
        sequelize,
        modelName: "Gotra",
        tableName: "gotra",
        timestamps: true,
    }
)

module.exports=Gotra;
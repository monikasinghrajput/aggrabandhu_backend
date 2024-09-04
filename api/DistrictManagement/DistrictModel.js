const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");


class Disctrict extends Model {
   
}

Disctrict.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        state_id:{
            type: DataTypes.BIGINT,
            allowNull:false,
            references:{
                model:'states',
                key:'id'
            }
        },
        name :{
            type: DataTypes.STRING(255),
            allowNull:false,
            unique:true
        },
    },
    {
        sequelize,
        modelName: "District",
        tableName: "districts",
        timestamps: true,
    }
)

module.exports=Disctrict;
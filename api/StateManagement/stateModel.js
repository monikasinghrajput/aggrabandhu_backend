const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");
const District =require('../DistrictManagement/DistrictModel');


class State extends Model {
   
}

State.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        code:{
            type:DataTypes.STRING(200),
            unique:true,
            allowNull:false,
        },
        name :{
            type: DataTypes.STRING(255),
            allowNull:false,
            unique:true
        },
    },
    {
        sequelize,
        modelName: "State",
        tableName: "states",
        timestamps: true,
    }
)


State.hasMany(District,{foreignKey:'state_id',onDelete:'CASCADE'});


module.exports=State;
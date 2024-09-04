const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");


class Gallery extends Model {
   
}


Gallery.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        type:{
            type:DataTypes.ENUM('Photo','Video'),
            allowNull:false,
        },
        url:{
            type: DataTypes.STRING(255),
            allowNull:true,
        },
        description :{
            type : DataTypes.TEXT,
            allowNull:false,
        },
        uploaded_by:{
            type:DataTypes.BIGINT,
            references: {
                model: 'members', 
                key: 'id'       
            }
        },
    },
    {
    sequelize,
    modelName: "Gallery",
    tableName: "gallery",
    timestamps: true, 
    underscored: true 
    }
)

module.exports=Gallery;
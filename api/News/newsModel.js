const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");


class News extends Model {
   
}

News.init(
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
        author :{
            type: DataTypes.STRING(100),
            allowNull:false,
        },
        published_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    },
    {
        sequelize,
        modelName: "News",
        tableName: "news",
        timestamps: true,
    }
)

module.exports=News;
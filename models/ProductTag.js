const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id : {
      type : DataTypes.INTEGER,
      primaryKey : true ,
      autoIncrement : true ,
      allowNull : false ,
    },
    tagID : {
      type : DataTypes.INTEGER,
      references : {
        model : 'tag' ,
        key : 'id' 
      }
    },
    productID : {
      type : DataTypes.INTEGER ,
      references : {
        model : 'product' ,
        key : 'id' 
      }
    },
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const dayjs = require('dayjs');
class BlogPost extends Model {}


 BlogPost.init( {
    id:{
        type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt:{
        type: DataTypes.DATE,
      allowNull: false,
    defaultValue:dayjs().format('MM-DD-YYYY')
    }
},
{
    hooks: {
        beforeCreate: async (blogPost, options) => {
            blogPost.createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
          },
  },
    
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogPost',
  });

module.exports = BlogPost;
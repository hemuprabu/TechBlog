const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");
const dayjs = require("dayjs");
class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: function () {
        const currentDate = new Date();
        const formattedDate =
          currentDate.getMonth() +
          1 +
          "-" +
          currentDate.getDate() +
          "-" +
          currentDate.getFullYear();
        return formattedDate;
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "blogPost",
  }
);

module.exports = BlogPost;

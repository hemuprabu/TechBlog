const sequelize = require('../config/connection');
const {User, BlogPost} = require('../models');
const userData = require('./userData.json');
const blogPost = require('./blogPost.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  

    for (const blog of blogPost) {
        await BlogPost.create({
          ...blog
          
        });
      }
    
      process.exit(0);
}

seedDatabase();
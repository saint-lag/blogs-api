const { User, BlogPost, PostCategory, Category } = require('../database/models');

const createPost = async ({ title, content, categoryIds }, user) => {
  console.log('HEREEEEE:');
  console.log(user);
};

module.exports = { createPost };

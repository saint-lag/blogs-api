const Sequelize = require('sequelize');
const config = require('../database/config/config');
const {
  // User,
  BlogPost,
  PostCategory,
} = require('../database/models');

const sequelize = new Sequelize(config.development);

const createPost = async ({ title, content, categoryIds }, user) => {
  const userId = user.id;
  try {
    const data = await sequelize.transaction(async (t) => {
      const { id, updated, published } = await BlogPost.create(
        { title, content, userId },
        { transaction: t },
      );
      console.log('UPDATED, PUBLISHED');
      console.log(updated, published);
      const postCategories = categoryIds.map((categoryId) => ({ postId: id, categoryId }));
      await PostCategory.bulkCreate(postCategories, { transaction: t });

      return { id, title, content, userId, updated, published };
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createPost };

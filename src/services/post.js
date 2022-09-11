const {
  // User,
  BlogPost,
  PostCategory,
  Category,
  sequelize,
} = require('../database/models');

const createPost = async ({ title, content, categoryIds }, user) => {
  const checkCategory = await Category.findAll({ where: { id: categoryIds } });
  try {
    const result = await sequelize.transaction(async (t) => {
      const newPost = await BlogPost.create(
        { title, content, categoryIds, userId: user.id },
        { transaction: t },
      );
      const postCategory = checkCategory.map((category) => ({
        postId: newPost.id,
        categoryId: category.id,
      }));
      await PostCategory.bulkCreate(postCategory, { transaction: t });
      return newPost;
    });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createPost };

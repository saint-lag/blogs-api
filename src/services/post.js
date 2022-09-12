const Sequelize = require('sequelize');
const config = require('../database/config/config');
const {
  // User,
  BlogPost,
  PostCategory,
  Category,
} = require('../database/models');

const sequelize = new Sequelize(config.development);

const MIN_QUERY_LENGTH = 0;

const categoryIdFilter = async (categoryIds) => {
 const promise = await Promise.all(categoryIds.map(async (categoryId) => {
      const query = await Category.findAll({ where: { id: categoryId } });
      return query.length > MIN_QUERY_LENGTH && categoryId;
    }));
  return promise.filter((item) => typeof item === 'number');
};

const postCategoriesFormatter = (filteredCategoryIds, id) => filteredCategoryIds.map(
  (categoryId) => ({
    postId: id,
    categoryId,
  }),
);

const createPost = async ({ title, content, categoryIds }, user) => {
  const userId = user.id;
  const filteredCategoryIds = await categoryIdFilter(categoryIds);
  try {
    const data = await sequelize.transaction(async (t) => {
      const { id, updated, published } = await BlogPost.create(
        { title, content, userId },
        { transaction: t },
      );
      const postCategories = postCategoriesFormatter(filteredCategoryIds, id);
      await PostCategory.bulkCreate(postCategories, { transaction: t });

      return { id, title, content, userId, updated, published };
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createPost };

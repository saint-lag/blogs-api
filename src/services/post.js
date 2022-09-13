/* eslint-disable max-lines-per-function */
const Sequelize = require('sequelize');
const config = require('../database/config/config');
const {
  User,
  BlogPost,
  PostCategory,
  Category,
} = require('../database/models');
const {
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_OK,
} = require('../helpers/http.status.codes');

const sequelize = new Sequelize(config.development);

const MIN_QUERY_LENGTH = 0;

const categoryIdFilter = async (categoryIds) => {
  const promise = await Promise.all(
    categoryIds.map(async (categoryId) => {
      const query = await Category.findAll({ where: { id: categoryId } });
      return query.length > MIN_QUERY_LENGTH && categoryId;
    }),
  );
  return promise.filter((item) => typeof item === 'number');
};

const postCategoriesFormatter = (filteredCategoryIds, id) =>
  filteredCategoryIds.map((categoryId) => ({
    postId: id,
    categoryId,
  }));

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

async function getAllPosts() {
  const blogPostData = await BlogPost.findAll();
  const data = await Promise.all(
    blogPostData.map(async (obj) => {
      const { id, userId, title, content, published, updated } = obj;
      const postCategories = await PostCategory.findAll({
        where: { postId: id },
      });
      const { displayName, email, image } = await User.findByPk(userId);
      const categories = await Promise.all(
        await postCategories.map(async (postCategory) => {
          const result = await Category.findAll({
            where: { id: postCategory.categoryId },
          });
          return result.map((item) => ({ id: item.id, name: item.name }));
        }),
      );
      const user = { id: userId, displayName, email, image };
      const result = {
        id,
        title,
        content,
        userId,
        published,
        updated,
        categories: categories[0],
      };
      result.user = user;
      return result;
    }),
  );
  return data;
}

const getPostById = async (id) => {
  const blogPostData = await BlogPost.findByPk(id);
  // NOT FOUND
  if (!blogPostData) return null;
  // Gets blogPostData valuable info
  const { title, content, userId, published, updated } = blogPostData;
  // find User
  const user = await User.findByPk(userId);
  const { displayName, email, image } = user;
  // Defines userData

  const postCategories = await PostCategory.findAll({ where: { postId: id } });

  const categories = await Promise.all(
    await postCategories.map(async (postCategory) =>
      Category.findAll({ where: { id: postCategory.categoryId } })),
  );
  const data = {
    id: JSON.parse(id),
    title,
    content,
    userId,
    published,
    updated,
  };
  // adds Keys and Values to final object 'Data'
  data.user = { id: user.id, displayName, email, image };
  data.categories = categories[0].map((c) => ({ id: c.id, name: c.name }));

  return data;
};

const updatePostById = async (id, { title, content }, user) => {
  const { userId, published } = await BlogPost.findByPk(id);

  if (user.id !== userId) {
    return {
      data: null,
      message: 'Unauthorized user',
      status: HTTP_STATUS_UNAUTHORIZED,
    };
  }

  await BlogPost.update({ title, content }, { where: { id } });
  const { updated } = await BlogPost.findByPk(id);

  const postCategories = await PostCategory.findAll({ where: { postId: id } });

  const categories = await Promise.all(
    await postCategories.map(async (p) => {
      const result = await Category.findByPk(p.categoryId);
      return { id: result.id, name: result.name };
    }),
  );

  console.log(`CATEGORIES: ${categories}`);

  const data = {
    id: JSON.parse(id),
    title,
    content,
    userId,
    published,
    updated,
  };

  data.user = {
    id: userId,
    displayName: user.displayName,
    email: user.email,
    image: user.image,
  };
  data.categories = categories;

  return { data, message: null, status: HTTP_STATUS_OK };
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
};

const { Category } = require('../database/models');

const httpStatus = require('../helpers/http.status.codes');

const createCategory = async (name) => {
  const data = await Category.create({ name });

  if (!data) {
    return {
      code: httpStatus.HTTP_STATUS_INTERNAL_SERVER,
      message: { message: 'Something went terribly wrong' },
    };
  }

  return { code: httpStatus.HTTP_STATUS_CREATED, data };
};

const getAllCategories = async () => {
  const data = await Category.findAll();
  return { code: httpStatus.HTTP_STATUS_OK, data };
};

module.exports = { createCategory, getAllCategories };

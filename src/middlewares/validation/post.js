const httpStatus = require('../../helpers/http.status.codes');
const { Category } = require('../../database/models');

const getPostValidation = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const lst = [title, categoryIds, content];

  if (lst.some((item) => item.length === 0)) {
    return res
      .status(httpStatus.HTTP_STATUS_BAD_REQUEST)
      .json({ message: 'Some required fields are missing' });
  }
  const categoryQuery = async (id) => Category.findOne({ where: { id } });
  const categoriesQueryMap = await Promise.all(
    categoryIds.map(async (id) => categoryQuery(id)),
  );
  const categoryQuerySome = categoriesQueryMap.some((query) => query !== null);

  if (categoryQuerySome !== true) {
    return res
      .status(httpStatus.HTTP_STATUS_BAD_REQUEST)
      .json({ message: '"categoryIds" not found' });
  }
  next();
};

const updatePostValidation = async (req, res, next) => {
  const { title, content } = req.body;

  const lst = [title, content];

  if (lst.some((item) => item === undefined || item.length === 0)) {
    return res
      .status(httpStatus.HTTP_STATUS_BAD_REQUEST)
      .json({ message: 'Some required fields are missing' });
  }
  
  next();
};

module.exports = {
  getPostValidation,
  updatePostValidation,
};

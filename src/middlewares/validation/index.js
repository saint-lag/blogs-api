const loginValidation = require('./login');
const { postUserValidation } = require('./user');
const categoriesValidation = require('./categories');
const {
  getPostValidation,
  updatePostValidation,
  blogPostUserValidation,
  blogPostIdValidation,
} = require('./post');

module.exports = {
  loginValidation,
  postUserValidation,
  categoriesValidation,
  getPostValidation,
  updatePostValidation,
  blogPostUserValidation,
  blogPostIdValidation,
};

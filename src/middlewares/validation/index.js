const loginValidation = require('./login');
const userValidation = require('./user');
const categoriesValidation = require('./categories');
const {
  getPostValidation,
  updatePostValidation,
  blogPostUserValidation,
  blogPostIdValidation,
} = require('./post');

module.exports = {
  loginValidation,
  userValidation,
  categoriesValidation,
  getPostValidation,
  updatePostValidation,
  blogPostUserValidation,
  blogPostIdValidation,
};

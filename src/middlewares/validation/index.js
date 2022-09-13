const loginValidation = require('./login');
const userValidation = require('./user');
const categoriesValidation = require('./categories');
const { getPostValidation, updatePostValidation } = require('./post');

module.exports = {
  loginValidation,
  userValidation,
  categoriesValidation,
  getPostValidation,
  updatePostValidation,
};

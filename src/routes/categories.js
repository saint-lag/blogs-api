const express = require('express');
const categories = require('../controllers/categories');
const validation = require('../middlewares/validation');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.post(
  '/',
  authentication.tokenValidation,
  validation.categoriesValidation,
  categories.createCategory,
);

router.get('/', authentication.tokenValidation, categories.getAllCategories);

module.exports = router;

const express = require('express');
const post = require('../controllers/post');
const validation = require('../middlewares/validation');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.post(
  '/',
  authentication.tokenValidation,
  validation.getPostValidation,
  post.createPost,
);

router.get('/', authentication.tokenValidation, post.getAllPosts);

router.get('/:id', authentication.tokenValidation, post.getPostById);

router.put(
  '/:id',
  authentication.tokenValidation,
  validation.blogPostIdValidation,
  validation.blogPostUserValidation,
  validation.updatePostValidation,
  post.updatePostById,
);

router.delete(
  '/:id',
  authentication.tokenValidation,
  validation.blogPostIdValidation,
  validation.blogPostUserValidation,
  post.deletePostById,
);

module.exports = router;

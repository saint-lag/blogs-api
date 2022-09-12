const express = require('express');
const post = require('../controllers/post');
const validation = require('../middlewares/validation');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.post('/', authentication.tokenValidation, validation.postValidation, post.createPost);

router.get('/', authentication.tokenValidation, post.getAllPosts);

module.exports = router;

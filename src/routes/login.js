const express = require('express');
const login = require('../controllers/login');
const validation = require('../middlewares/validation');

const router = express.Router();

router
  .post('/', validation.loginValidation, login);

module.exports = router;

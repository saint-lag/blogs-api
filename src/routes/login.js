const express = require('express');
const login = require('../controllers/login');
const validation = require('../middlewares/validation');

const router = express.Router();

router
  .post('/', validation.login, login);

module.exports = router;

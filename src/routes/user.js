const express = require('express');
const user = require('../controllers/user');
const validation = require('../middlewares/validation');

const router = express.Router();

router.post('/', validation.user, user);

module.exports = router;

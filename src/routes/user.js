const express = require('express');
const user = require('../controllers/user');
const validation = require('../middlewares/validation');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.post('/', validation.userValidation, user.createUser);

router.get('/', authentication.tokenValidation, user.getAllUsers);

router.get('/:id', authentication.tokenValidation, user.getUserById);

module.exports = router;

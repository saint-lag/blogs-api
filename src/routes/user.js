const express = require('express');
const user = require('../controllers/user');
const validation = require('../middlewares/validation');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.post('/', validation.postUserValidation, user.createUser);

router.get('/', authentication.tokenValidation, user.getAllUsers);

router.get('/:id', authentication.tokenValidation, user.getUserById);

router.delete('/me', authentication.tokenValidation, user.deleteUserById);

module.exports = router;

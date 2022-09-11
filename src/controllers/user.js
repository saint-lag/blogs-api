const service = require('../services/user');

const httpStatus = require('../helpers/http.status.codes.js');

const USER_ALREADY_EXISTS_MESSAGE = 'User already registered';

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const token = await service.createUser({
    displayName,
    email,
    password,
    image,
  });

  if (!token) {
    return res
      .status(httpStatus.HTTP_STATUS_CONFLICT)
      .json({ message: USER_ALREADY_EXISTS_MESSAGE });
  }

  return res.status(httpStatus.HTTP_STATUS_CREATED).json({ token });
};

const getAllUsers = async (_req, res) => {
  const data = await service.getAllUsers();
  return res.status(httpStatus.HTTP_STATUS_OK).json(data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { code, user, message } = await service.getUserById(id);
  return res.status(code).json(user || message);
};

module.exports = { createUser, getAllUsers, getUserById };

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

module.exports = createUser;

const { User } = require('../database/models');
const createToken = require('../util/createToken');
const httpStatus = require('../helpers/http.status.codes');

const createUser = async (payload) => {
  const { displayName, email, password, image } = payload;

  const [user, created] = await User.findOrCreate({
    where: {
      displayName,
      email,
      password,
      image,
    },
  });

  if (!created || !user) return null;

  if (created) {
    const token = createToken({ displayName, email, image }, '1d');
    return token;
  }
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return users || null;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return {
      code: httpStatus.HTTP_STATUS_NOT_FOUND,
      message: { message: 'User does not exist' },
    };
  }

  return { code: httpStatus.HTTP_STATUS_OK, user };
};

module.exports = { createUser, getAllUsers, getUserById };

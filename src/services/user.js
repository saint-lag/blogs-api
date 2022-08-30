const { User } = require('../database/models');
const createToken = require('../util/createToken');

const createUser = async (payload) => {
  const { displayName, email, password, image } = payload;

  const query = await User.findOne({ where: { email } });

  if (query) return null;

  // needs to insert new user in table
  
  const token = createToken({ displayName, email, image }, '1d');

  return token;
};

module.exports = { createUser };
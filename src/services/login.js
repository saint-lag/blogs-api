const { User } = require('../database/models');
const createToken = require('../util/createToken');

const login = async ({ email, password }) => {
  const query = await User.findOne({ where: { email, password } });
  
  if (!query) return null;

  const { id, displayName } = query;
  
  const token = createToken({ id, displayName, email }, '1d');

  return token;
};

module.exports = { login };

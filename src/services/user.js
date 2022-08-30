const { User } = require('../database/models');
const createToken = require('../util/createToken');

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

  console.log(user);

  console.log(created);

  if (!created) return null;

  if (created) {
    const token = createToken({ displayName, email, image }, '1d');
    return token;
  }
};

module.exports = { createUser };
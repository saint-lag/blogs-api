require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');

const createToken = (payload, timeout) => {
  const config = {
    expiresIn: timeout,
    algorithm: 'HS256',
  };

  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, config);
};

module.exports = createToken;
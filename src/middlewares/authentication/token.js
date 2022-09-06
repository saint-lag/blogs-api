require('dotenv').config();
const jwt = require('jsonwebtoken');
const httpStatus = require('../../helpers/http.status.codes');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res
      .status(httpStatus.HTTP_STATUS_UNAUTHORIZED)
      .json({ message: 'Token not found' });
  }

  try {
    const jwtVerification = jwt.verify(authorization, JWT_SECRET);
    req.user = jwtVerification;
    next();
  } catch (error) {
    res
      .status(httpStatus.HTTP_STATUS_UNAUTHORIZED)
      .json({ message: 'Expired or invalid token' });
  }
};

module.exports = tokenValidation;

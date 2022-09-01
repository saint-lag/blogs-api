require('dotenv').config();
const jwt = require('jsonwebtoken');
const httpStatus = require('../../helpers/http.status.codes');

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res
      .status(httpStatus.HTTP_STATUS_UNAUTHORIZED)
      .json({ message: 'Token not found' });
  }

  const decode = jwt.verify(authorization, process.env.JWT_SECRET);

  req.locals.authenticated = decode;

  if (PLACEHOLDER) {
    res
      .status(httpStatus.HTTP_STATUS_UNAUTHORIZED)
      .json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = tokenValidation;

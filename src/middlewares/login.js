const httpStatus = require('../helpers/http.status.codes');

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res
      .status(httpStatus.HTTP_STATUS_BAD_REQUEST)
      .json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = login;
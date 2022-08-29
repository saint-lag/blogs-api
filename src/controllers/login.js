const service = require('../services/login');

const httpStatus = require('../helpers/http.status.codes.js');

const login = async (req, res) => {
  const { email, password } = req.body;

  const token = await service.login({ email, password });

  res.status(httpStatus.HTTP_STATUS_OK).json({ token });
};

module.exports = login;
const service = require('../services/login');

const httpStatus = require('../helpers/http.status.codes.js');

const login = async (req, res) => {
  const { email, password } = req.body;

  const token = await service.login({ email, password });

  if (!token) {
    return res
      .status(httpStatus.HTTP_STATUS_BAD_REQUEST)
      .json({ message: 'Invalid fields' });
  }

  return res.status(httpStatus.HTTP_STATUS_OK).json({ token });
};

module.exports = login;

const httpStatus = require('../../helpers/http.status.codes');

const categoriesValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(httpStatus.HTTP_STATUS_BAD_REQUEST)
      .json({ message: '"name" is required' });
  }
  next();
};

module.exports = categoriesValidation;

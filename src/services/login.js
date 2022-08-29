const model = require('../database/models/user');
const createToken = require('../util/createToken');
const httpStatus = require('../helpers/http.status.codes');

const login = async (payload) => {
  const { email, password } = payload;

  const user = await model.findOne({ where: { email, password } });

  if (!user) {
    throw new Error('Invalid fields', {
      cause: { status: httpStatus.HTTP_STATUS_BAD_REQUEST },
    });
  }

  const { id, displayName } = user;

  return createToken({ id, displayName, email });
};

module.exports = { login };

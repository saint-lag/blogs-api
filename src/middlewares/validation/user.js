const httpStatus = require('../../helpers/http.status.codes');

const PASSWORD_MIN_LENGTH = 6;
const DISPLAY_NAME_MIN_LENGTH = 8;
const REGEX = /^(.+)@(.+)$/;

const DISPLAY_NAME_MESSAGE = '"displayName" length must be at least 8 characters long'; 
const EMAIL_FORMAT_MESSAGE = '"email" must be a valid email';
const INVALID_PASSWORD_MESSAGE = '"password" length must be at least 6 characters long';

const postUserValidation = (req, res, next) => {
  const { displayName, email, password } = req.body;

  const res400 = (message) => res.status(httpStatus.HTTP_STATUS_BAD_REQUEST).json({
      message,
    });

  if (displayName.length < DISPLAY_NAME_MIN_LENGTH) return res400(DISPLAY_NAME_MESSAGE);

  if (!email.match(REGEX)) return res400(EMAIL_FORMAT_MESSAGE);
  
  if (password.length < PASSWORD_MIN_LENGTH) return res400(INVALID_PASSWORD_MESSAGE);

  next();
};

module.exports = { postUserValidation };

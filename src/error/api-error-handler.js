const { ERROR_CODES } = require('../constants/error');
const ApiError = require('./api-error');

// eslint-disable-next-line no-unused-vars
const apiErrorHandler = (error, req, res, next) => {
  console.error(error.stack);
  if (error?.code === ERROR_CODES.AUTH) return res.status(401).json(ApiError.unauthorized(error.message));
  return res.status(500).json(ApiError.internal(error.message));
};

module.exports = apiErrorHandler;

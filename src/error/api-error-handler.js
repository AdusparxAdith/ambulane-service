const ApiError = require('./api-error');

// eslint-disable-next-line no-unused-vars
const apiErrorHandler = (error, req, res, next) => {
  console.error(error.message);
  res.status(500).json(ApiError.internal(error.message));
};

module.exports = apiErrorHandler;

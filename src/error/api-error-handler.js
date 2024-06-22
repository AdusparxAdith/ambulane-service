const ApiError = require('./api-error');

function apiErrorHandler(_, res) {
  return res.status(500).json(ApiError.internal('something went wrong'));
}

module.exports = apiErrorHandler;

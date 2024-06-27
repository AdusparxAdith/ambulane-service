const locationConstants = require('./location');
const userConstants = require('./user');
const errorCodes = require('./error');

module.exports = Object.freeze({
  ...locationConstants,
  ...userConstants,
  ...errorCodes,
});

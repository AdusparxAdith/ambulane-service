const locationConstants = require('./location');
const userConstants = require('./user');

module.exports = Object.freeze({
  ...locationConstants,
  ...userConstants,
});

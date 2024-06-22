const jwt = require('jsonwebtoken');

module.exports = class AuthLogic {
  static generateAuthToken({ id, secret }) {
    return jwt.sign({ time: new Date(), id }, secret);
  }
};

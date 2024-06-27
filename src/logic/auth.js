const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = class AuthLogic {
  static generateAuthToken({
    id, name, username, type, location, test,
  }) {
    return jwt.sign({
      time: new Date(), id, name, type, username, location, test,
    }, config.authSecret, { expiresIn: '24h' });
  }

  static verifyAuthToken(token) {
    if (!token) return false;
    try {
      return jwt.verify(token, config.authSecret);
    }
    catch (err) {
      return false;
    }
  }
};

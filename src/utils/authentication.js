const config = require('../config/index');

// eslint-disable-next-line import/prefer-default-export
function authenticateSocket(socket, next) {
  const token = socket.handshake.headers.access_token;

  if (!token) {
    return next(new Error('Authentication error: Token missing'));
  }

  if (token !== config.authSecret) {
    return next(new Error('Authentication error: Incorrect token'));
  }

  return next();
}

module.exports = {
  authenticateSocket,
};

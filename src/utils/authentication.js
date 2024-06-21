import config from '../config/index.js';

// eslint-disable-next-line import/prefer-default-export
export function authenticateSocket(socket, next) {
  const token = socket.handshake.headers.access_token;

  if (!token) {
    return next(new Error('Authentication error: Token missing'));
  }

  if (token !== config.authSecret) {
    return next(new Error('Authentication error: Token missing'));
  }

  return next();
}

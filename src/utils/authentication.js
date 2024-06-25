const config = require('../config/index');
const AuthLogic = require('../logic/auth');

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

function authenticateRoute(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const verified = AuthLogic.verifyAuthToken(token);

    if (!verified) {
      return next(new Error('Authentication error: Invalid token'));
    }

    req.user = verified;
    return next();
  }
  catch (error) {
    return next(new Error('Authentication error: Token verification failed'));
  }
}

function parseCookies(headers) {
  const cookies = {};
  const cookieHeader = headers?.cookie;
  if (!cookieHeader) return cookies;

  cookieHeader.split(';').forEach((cookie) => {
    const [name, ...rest] = cookie.split('=');
    if (!name) return;

    const trimmedName = name.trim();
    if (!trimmedName) return;

    const value = rest.join('=').trim();
    if (!value) return;

    cookies[trimmedName] = decodeURIComponent(value);
  });

  return cookies;
}

module.exports = {
  parseCookies,
  authenticateSocket,
  authenticateRoute,
};

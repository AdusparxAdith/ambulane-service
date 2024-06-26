const AuthLogic = require('../logic/auth');

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

// eslint-disable-next-line import/prefer-default-export
function authenticateSocket(socket, next) {
  const cookies = parseCookies(socket.handshake.headers);
  const verified = AuthLogic.verifyAuthToken(cookies.token);

  if (!verified) {
    return next(new Error('Authentication error: Token missing'));
  }
  // eslint-disable-next-line no-param-reassign
  socket.user = verified;
  return next();
}

function authenticateRoute(req, res, next) {
  const cookies = parseCookies(req.headers);
  try {
    const verified = AuthLogic.verifyAuthToken(cookies.token);

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

module.exports = {
  parseCookies,
  authenticateSocket,
  authenticateRoute,
};

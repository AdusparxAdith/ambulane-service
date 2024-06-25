require('dotenv/config');
const convict = require('convict');

const config = convict({
  appServerPort: {
    doc: 'The port for app HTTP requests',
    format: 'port',
    default: 8080,
    env: 'APP_SERVER_PORT',
  },
  socketServerPort: {
    doc: 'The port for socket requests',
    format: 'port',
    default: 8081,
    env: 'SOCKET_SERVER_PORT',
  },
  authSecret: {
    doc: 'The port for socket requests',
    format: String,
    default: '',
    env: 'AUTH_SECRET',
  },
  dbURI: {
    doc: 'URI to database connection',
    format: String,
    default: 'mongodb://127.0.0.1:27017',
    env: 'MONGODB_URI',
  },
  allowedOrigins: {
    doc: 'Allowed Origins for requests',
    format: String,
    default: [],
    env: 'ALLOWED_ORIGINS',
  },
});

config.validate({ allowed: 'strict' });

module.exports = {
  ...config.getProperties(),
};

import 'dotenv/config';
import convict from 'convict';

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
});

config.validate({ allowed: 'strict' });

export default {
  ...config.getProperties(),
};

import config from './config/index.js';
import Server from './bootstrap/server.js';
import SocketServer from './bootstrap/socket-server.js';

function main() {
  const server = new Server({ config });
  const socketServer = new SocketServer({ config });
  server.start([socketServer]);
}

main();

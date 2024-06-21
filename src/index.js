import 'dotenv/config';
import Server from './bootstrap/server.js';
import SocketServer from './bootstrap/socket-server.js';

function main() {
  const server = new Server();
  const socketServer = new SocketServer();
  server.start([socketServer]);
}

main();

const { setupContainer } = require('./bootstrap/container');

setupContainer();

const Server = require('./bootstrap/server');
const SocketServer = require('./bootstrap/socket-server');
const config = require('./config');

function main() {
  const server = new Server({ config });
  const socketServer = new SocketServer({ config });
  server.start([socketServer]);
}

main();

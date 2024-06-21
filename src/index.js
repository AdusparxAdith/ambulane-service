const { setupContainer } = require('./bootstrap/container');

const container = setupContainer();

const Server = require('./bootstrap/server');
const SocketServer = require('./bootstrap/socket-server');
const Database = require('./bootstrap/db');
const config = require('./config');

function main() {
  const server = new Server({ config });
  const socketServer = new SocketServer({ config });
  const db = new Database({ config });

  server.start([socketServer, db], container);
}

main();

import 'dotenv/config';
import Server from './bootstrap/server.js';

function main() {
  const server = new Server();
  server.start();
}

main();

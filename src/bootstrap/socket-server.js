const http = require('http');
const { Server } = require('socket.io');
const { authenticateSocket } = require('../utils/authentication');
const withErrorHandling = require('../error/socket-error-handler');

const events = require('../events');

module.exports = class SocketServer {
  constructor({ config }) {
    this.config = config;
    this.io = null;
  }

  start() {
    const server = http.createServer();
    server.listen(this.config.socketServerPort, () => {
      console.debug(`Socket.IO Server listening on port ${this.config.socketServerPort}`);
    });
    this.io = new Server(server);
    this.io.use((socket, next) => {
      authenticateSocket(socket, next);
    });
    this.io.on('connection', (socket) => {
      console.debug('Client connected');

      events.forEach(({ eventName, handler }) => socket.on(eventName, withErrorHandling(socket, handler)));

      socket.on('disconnect', () => {
        console.debug('Client disconnected');
      });
    });
  }
};

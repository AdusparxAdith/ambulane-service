import http from 'http';
import { Server } from 'socket.io';
import { authenticateSocket } from '../utils/authentication.js';

export default class SocketServer {
  constructor() {
    this.io = null;
  }

  start() {
    const server = http.createServer();
    server.listen(process.env.SOCKET_SERVER_PORT, () => {
      console.log(`Socket.IO server listening on port ${process.env.SOCKET_SERVER_PORT}`);
    });
    this.io = new Server(server);
    this.io.use((socket, next) => {
      authenticateSocket(socket, next);
    });
    this.io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('location', (data) => {
        console.log('Received location:', data);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
}

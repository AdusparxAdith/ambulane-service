import express from 'express';

export default class Server {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(express.json());
  }

  setupRoutes() {
    this.app.get('/', (req, res) => {
      res.send('Hello, World!');
    });
  }

  start() {
    const PORT = process.env.SERVER_PORT;
    this.app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  }
}

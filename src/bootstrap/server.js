import express from 'express';
import defaultRoutes from '../routes/default.js';
import ambulanceRoutes from '../routes/ambulance.js';
import userRoutes from '../routes/user.js';

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
    this.app.use('/', defaultRoutes);
    this.app.use('/ambulance', ambulanceRoutes);
    this.app.use('/user', userRoutes);
    this.app.use((_, res) => {
      res.status(404).send('Not Found');
    });
  }

  start(components) {
    const PORT = process.env.HTTP_SERVER_PORT;
    this.app.listen(PORT, () => {
      console.log(`Started Server on port ${PORT}`);
      components.forEach(((component) => {
        try {
          component.start();
          console.log('Started', component.constructor.name);
        }
        catch (error) {
          console.error(error);
        }
      }));
    });
  }
}

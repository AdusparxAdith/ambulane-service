const express = require('express');
const defaultRoutes = require('../routes/default');
const ambulanceRoutes = require('../routes/ambulance');
const userRoutes = require('../routes/user');

module.exports = class Server {
  constructor({ config }) {
    this.config = config;
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
    const PORT = this.config.appServerPort;
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
};

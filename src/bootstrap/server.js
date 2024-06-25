const express = require('express');
const cors = require('cors');
const defaultRoutes = require('../routes/default');
const locationRoutes = require('../routes/location');
const userRoutes = require('../routes/user');
const apiErrorHandler = require('../error/api-error-handler');

module.exports = class Server {
  constructor({ config }) {
    this.config = config;
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    const { allowedOrigins } = this.config;
    this.app.use(cors({
      origin(origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        }
        else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    }));
    this.app.use(express.json());
  }

  setupRoutes() {
    this.app.use('/', defaultRoutes);
    this.app.use('/location', locationRoutes);
    this.app.use('/user', userRoutes);
    this.app.get('*', (req, res) => res.status(404));
    this.app.use(apiErrorHandler);
  }

  start(components) {
    const PORT = this.config.appServerPort;
    this.app.listen(PORT, () => {
      console.debug(`Started Server on port ${PORT}`);
      components.forEach((component) => {
        try {
          component.start();
          console.debug('Starting', component.constructor.name, '....');
        }
        catch (error) {
          console.error(error);
        }
      });
    });
  }
};

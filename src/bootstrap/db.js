const mongoose = require('mongoose');

module.exports = class Database {
  constructor({ config }) {
    this.config = config;
  }

  async start() {
    const URI = this.config.dbURI;
    try {
      await mongoose.connect(URI);
      console.debug('Connected to MongoDB');
    }
    catch (error) {
      console.error('Error connecting to MongoDB', error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async stop() {
    try {
      await mongoose.disconnect();
      console.debug('Disconnected from MongoDB');
    }
    catch (error) {
      console.error('Error disconnecting from MongoDB', error);
    }
  }
};

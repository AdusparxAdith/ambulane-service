const { container } = require('../bootstrap/container');

const LocationService = container.resolve('LocationService');

module.exports = [
  {
    eventName: 'update-location',
    handler: async ({ id, coordinates }) => {
      await LocationService.updateLocation({ id, coordinates });
    },
  },
];

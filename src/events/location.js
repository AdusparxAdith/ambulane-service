const { container } = require('../bootstrap/container');

const LocationService = container.resolve('LocationService');

module.exports = [
  {
    eventName: 'update-location',
    handler: async ({ user, coordinates }) => {
      await LocationService.updateLocation({ user, coordinates });
    },
  },
];

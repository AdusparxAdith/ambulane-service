const { container } = require('../bootstrap/container');

const LocationController = container.resolve('LocationController');

module.exports = [
  {
    eventName: 'update-location',
    handler: ({ id, coordinates }) => {
      console.log('Received location:', { id, coordinates });
      LocationController.updateLocation({ id, coordinates });
    },
  },
];

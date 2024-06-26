const { formatLocationMarkers } = require('../formatter/location');

module.exports = class LocationController {
  constructor({ LocationService }) {
    this.LocationService = LocationService;
  }

  async getLocations(_, res) {
    const { LocationService } = this;
    const { locations } = await LocationService.getLocations();
    res.send(locations);
  }

  async getNearby(req, res) {
    const { coordinates, type } = req.body;
    const { LocationService } = this;
    const { locations } = await LocationService.getNearby({ coordinates, type });
    res.send(formatLocationMarkers(locations));
  }
};

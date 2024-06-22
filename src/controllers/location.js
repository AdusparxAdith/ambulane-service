module.exports = class LocationController {
  constructor({ LocationService }) {
    this.LocationService = LocationService;
  }

  async getLocations(_, res) {
    const { LocationService } = this;
    const { locations } = await LocationService.getLocations();
    res.send(locations);
  }
};

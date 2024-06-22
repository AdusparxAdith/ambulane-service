module.exports = class LocationService {
  constructor({ UserDataAccess }) {
    this.UserDataAccess = UserDataAccess;
  }

  async getLocations() {
    const { UserDataAccess } = this;
    const { locations } = await UserDataAccess.getLocations();
    return { locations };
  }

  async getNearby({ coordinates }) {
    const { UserDataAccess } = this;
    const { locations } = await UserDataAccess.getNearby({ coordinates });
    return { locations };
  }

  async updateLocation({ id, coordinates }) {
    const { UserDataAccess } = this;
    const { updatedLocation } = await UserDataAccess.updateLocation({ id, coordinates });
    return { updatedLocation };
  }
};

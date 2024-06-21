module.exports = class LocationController {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  async getLocations() {
    const { UserModel } = this;
    const locations = await UserModel.find();
    return locations;
  }

  async updateLocation({ id, coordinates }) {
    const { UserModel } = this;
    const updatedLocation = await UserModel.findByIdAndUpdate(id, {
      $set: {
        location: {
          type: 'Point',
          coordinates,
        },
      },
    }, { upsert: true });
    return updatedLocation;
  }
};

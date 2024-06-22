const { NEARBY_MIN_DISTANCE, NEARBY_MAX_DISTANCE } = require('../constants');

module.exports = class UserDataAccess {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  async getLocations() {
    const { UserModel } = this;
    const locations = await UserModel.find();
    return { locations };
  }

  async getNearby({ coordinates }) {
    const { UserModel } = this;
    const locations = await UserModel.find({
      location:
          {
            $near:
             {
               $geometry: { type: 'Point', coordinates },
               $minDistance: NEARBY_MIN_DISTANCE,
               $maxDistance: NEARBY_MAX_DISTANCE,
             },
          },
    });
    return { locations };
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
    });
    return { updatedLocation };
  }
};

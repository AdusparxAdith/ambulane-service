const { NEARBY_MIN_DISTANCE, NEARBY_MAX_DISTANCE } = require('../constants');

module.exports = class UserDataAccess {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  async createUser({
    username, password, name, type, location,
  }) {
    const { UserModel } = this;
    const user = await UserModel.create({
      username, password, name, type, location,
    });
    return { user };
  }

  async getUser({
    username, password,
  }) {
    const { UserModel } = this;
    const user = await UserModel.findOne({
      username, password,
    }).lean();
    return { user };
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

const mongoose = require('mongoose');

const { USER_TYPES } = require('../../constants');

const UserSchema = new mongoose.Schema({
  username: {
    type: String, required: true, unique: true, index: true,
  },
  password: { type: String, required: true },
  type: { type: Number, enum: Object.values(USER_TYPES), required: true },
  name: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'], // GeoJSON type
      default: 'Point',
    },
    coordinates: { type: [Number], required: true }, // Longitude (East/West), Latitude (North/South)
  },
  active: { type: Boolean, default: true },
});

UserSchema.index({ username: 1 }, { unique: true });
// Add 2dsphere index for geospatial queries on location field
UserSchema.index({ location: '2dsphere' });

module.exports = UserSchema;

const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserModel = mongoose.model('User', new Schema({
  username: String,
  password: String,
  type: String,
  name: String,
  location: { type: { type: String }, coordinates: [Number] },
}));

module.exports = () => UserModel;

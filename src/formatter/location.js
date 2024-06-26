const { formatUser } = require('./user');

function formatLocationMarkers(users) {
  return users.map((user) => formatUser(user));
}

module.exports = {
  formatLocationMarkers,
};

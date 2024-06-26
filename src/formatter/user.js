/* eslint-disable no-param-reassign */

function formatUser(user) {
  const { coordinates } = user.location;
  const [lng, lat] = coordinates;
  if (!lat || !lng) return undefined;
  const id = user._id;
  delete user._id;
  return {
    ...user,
    id,
    location: { lat, lng },
  };
}

module.exports = {
  formatUser,
};

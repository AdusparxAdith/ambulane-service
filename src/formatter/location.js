function formatLocationMarkers(users) {
  return users.map((user) => {
    const { coordinates } = user.location;
    const [lng, lat] = coordinates;
    if (!lat || !lng) return undefined;
    return {
      ...user,
      _id: undefined,
      id: user._id,
      location: { lat, lng },
    };
  });
}

module.exports = {
  formatLocationMarkers,
};

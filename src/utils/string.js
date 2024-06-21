function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatCapitalizedWithAppend(suffix) {
  return (name) => `${capitalizeFirstLetter(name)}${suffix}`;
}

module.exports = {
  capitalizeFirstLetter,
  formatCapitalizedWithAppend,
};

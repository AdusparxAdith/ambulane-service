const awilix = require('awilix');
const { formatCapitalizedWithAppend } = require('../utils/string');

const container = awilix.createContainer();

function setupContainer() {
  // load Models
  container.loadModules(
    ['../data-access/models/*.js'],
    {
      cwd: __dirname,
      formatName: formatCapitalizedWithAppend('Model'),
    },
  );

  // load Controllers
  container.loadModules(
    ['../controllers/*.js'],
    {
      cwd: __dirname,
      formatName: formatCapitalizedWithAppend('Controller'),
    },
  );

  return container;
}

module.exports = { container, setupContainer };

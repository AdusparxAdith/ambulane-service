const awilix = require('awilix');
const { formatCapitalizedWithAppend } = require('../utils/string');
const config = require('../config');

const container = awilix.createContainer();

function setupContainer() {
  // load config
  container.register('config', awilix.asValue(config));

  // load Models
  container.loadModules(
    ['../data-access/models/*.js'],
    {
      cwd: __dirname,
      formatName: formatCapitalizedWithAppend('Model'),
    },
  );

  // load Models
  container.loadModules(
    ['../data-access/*.js'],
    {
      cwd: __dirname,
      formatName: formatCapitalizedWithAppend('DataAccess'),
    },
  );

  // load Services
  container.loadModules(
    ['../services/*.js'],
    {
      cwd: __dirname,
      formatName: formatCapitalizedWithAppend('Service'),
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

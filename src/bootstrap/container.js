const awilix = require('awilix');
const { formatCapitalizedWithAppend } = require('../utils/string');

const container = awilix.createContainer();

function setupContainer() {
  // load controllers
  container.loadModules(
    ['../controllers/*.js'],
    {
      cwd: __dirname,
      formatName: formatCapitalizedWithAppend('Controller'),
    },
  );
}

module.exports = { container, setupContainer };

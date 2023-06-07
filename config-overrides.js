const path = require('path');

module.exports = function override(config) {
  config.resolve.alias['react-router-dom'] = path.resolve(
    __dirname,
    'node_modules/react-router-dom'
  );

  return config;
};
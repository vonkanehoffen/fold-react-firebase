const path = require('path');
const fs = require('fs');

// See https://daveceddia.com/customize-create-react-app-webpack-without-ejecting/

module.exports = function(config) {

  config.entry = [ 'react-scripts/config/polyfills.js',
    'react-dev-utils/webpackHotDevClient.js',
    './src/indexChromeExt.js' ]

  console.log(config)
}
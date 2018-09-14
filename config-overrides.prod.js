const path = require('path');
const fs = require('fs');

module.exports = function(config) {

  config.entry = [ 'react-scripts/config/polyfills.js',
    'react-dev-utils/webpackHotDevClient.js',
    './src/indexChromeExt.js' ]

  // config.paths.appBuild = '/Users/cormorant/Code/fold.im/fold-react-firebase/buildChromeExt'
  config.output.path = '/Users/cormorant/Code/fold.im/fold-react-firebase/buildChromeExt'
  // config.output.filename = 'staticChromeExt/js/[name].[chunkhash:8].js'
  // chunkFilename = 'staticChromeExt/js/[name].[chunkhash:8].chunk.js',

  console.log(config)
}
/**
 * Override CRA for building the chrome extension. Different entry point etc.
 * We want to share a lot of code between the different concerns, hence no second repo. Hence this.
 * See See https://daveceddia.com/customize-create-react-app-webpack-without-ejecting/
 */

const rewire = require('rewire');
const proxyquire = require('proxyquire');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

let defaults, config, paths

switch(process.argv[2]) {

  // The "start" script is run during development mode
  case 'start':

    defaults = rewire('react-scripts/scripts/start.js');
    config = defaults.__get__('config');
    config.entry = [
      'react-scripts/config/polyfills.js',
      'react-dev-utils/webpackHotDevClient.js',
      './src/indexChromeExt.js'
    ]

    break;

  // The "build" script is run to produce a production bundle
  case 'build':
    defaults = rewire('react-scripts/scripts/build.js');
    config = defaults.__get__('config');
    let paths = defaults.__get__('paths');

    config.output.path = resolveApp('buildChromeExt')
    config.entry =  [
      'react-scripts/config/polyfills.js',
      './src/indexChromeExt.js'
    ]

    paths.dotenv = resolveApp('.env')
    paths.appBuild = resolveApp('buildChromeExt')
    paths.appPublic = resolveApp('publicChromeExt')
    paths.appHtml = resolveApp('publicChromeExt/index.html')
    paths.appIndexJs = resolveApp('src/indexChromeExt.js')

    break;

}
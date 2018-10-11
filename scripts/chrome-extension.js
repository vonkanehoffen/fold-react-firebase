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
      resolveApp('node_modules/react-dev-utils/webpackHotDevClient.js'),
      resolveApp('src/indexChromeExt.js'),
    ]

    break;

  // The "build" script is run to produce a production bundle
  // Note CRA2 adds inline script, and to get Chrome to be OK with this, an sha256 hash for it needs to be added in manifest.json
  // See https://developer.chrome.com/extensions/contentSecurityPolicy#relaxing-inline-script
  // That hash is in chrome://extensions debug output
  case 'build':
    defaults = rewire('react-scripts/scripts/build.js');
    config = defaults.__get__('config');
    paths = defaults.__get__('paths');

    config.output.path = resolveApp('buildChromeExt')
    config.entry =  [
      resolveApp('src/indexChromeExt.js'),
    ]
    paths.dotenv = resolveApp('.env')
    paths.appBuild = resolveApp('buildChromeExt')
    paths.appPublic = resolveApp('publicChromeExt')
    paths.appHtml = resolveApp('publicChromeExt/index.html')
    paths.appIndexJs = resolveApp('src/indexChromeExt.js')

    break;

}
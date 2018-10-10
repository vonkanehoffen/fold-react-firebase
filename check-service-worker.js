'use strict';

// See https://github.com/facebook/create-react-app/issues/2612#issuecomment-311490137

var fs = require('fs');

var manifest = require('./build/asset-manifest');
var sw = fs.readFileSync('./build/service-worker.js');

Object.keys(manifest).forEach(key => {
  if (key.endsWith('.map')) {
    return;
  }
  var path = manifest[key];
  if (sw.indexOf(path) === -1) {
    throw new Error('Not cached: ' + manifest[key]);
  }
});
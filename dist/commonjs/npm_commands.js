'use strict';

var mainWindow = require('electron').remote.getGlobal('mainWindow');
var node_modules = require('electron').remote.getGlobal('node_modules');

exports.install = function (packages, options) {
  var npm = require(require('module')._resolveFilename('npm', { paths: [node_modules] }));
  var npmOptions = options.npmOptions || {};

  var originalWorkingDirectory = process.cwd();
  process.chdir(npmOptions.workingDirectory || process.cwd());
  _log(options, 'chdir: ' + npmOptions.workingDirectory);

  return exports.load(npm, npmOptions).then(function () {

    npm.registry.log.on('log', function (msg) {
      _log(options, msg.message, msg.level);
    });

    _log(options, "loaded");
    return new Promise(function (resolve, reject) {

      _log(options, "installing...");
      npm.commands.install(packages, function (error) {
        console.log(packages);
        console.log(error);
        _log(options, "finished installing...");
        process.chdir(originalWorkingDirectory);

        resolve();
      });
    });
  }).catch(function (error) {
    process.chdir(originalWorkingDirectory);
    throw error;
  });
};

exports.load = function (npm, options, error) {
  return new Promise(function (resolve, reject) {
    npm.load(options, function (error) {
      if (error) reject(error);else {
        resolve();
      }
    });
  });
};

function _log(options, msg) {
  var level = arguments.length <= 2 || arguments[2] === undefined ? 'process' : arguments[2];

  mainWindow.webContents.send(options.guid, { level: level, message: msg });
}
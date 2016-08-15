'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NPM = undefined;

var _guid = require('./guid');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var child_process = System._nodeRequire('child_process');
var path = System._nodeRequire('path');
var os = System._nodeRequire('os');
var requireTaskPool = System._nodeRequire('electron-remote').requireTaskPool;
var npmTaskPath = System._nodeRequire.resolve(__dirname + '/npm_commands.js');
var ipcRenderer = System._nodeRequire('electron').ipcRenderer;

var NPM = exports.NPM = function () {
  function NPM() {
    _classCallCheck(this, NPM);
  }

  NPM.prototype.install = function install(deps, options) {

    options.guid = (0, _guid.createGUID)();
    ipcRenderer.on(options.guid, function (event, msg) {
      if (options.logCallback) {
        options.logCallback(msg);
      }
    });

    var npmModule = requireTaskPool(npmTaskPath);

    return npmModule.install(deps, options).then(function () {
      ipcRenderer.removeAllListeners(options.guid);
    }).catch(function (error) {
      ipcRenderer.removeAllListeners(options.guid);
      throw error;
    });
  };

  NPM.prototype.setConfig = function setConfig(setting, value) {
    return new Promise(function (resolve, reject) {
      try {
        child_process.exec('npm config set ' + setting + ' ' + value, { maxBuffer: 1024 * 1024 }, function (error, stdout, stderr) {
          if (!error) {
            resolve(stdout);
          } else {
            reject(error);
          }
        });
      } catch (e) {
        console.log('Error running "npm config set ' + setting + ' ' + value + '"', e);
        reject(e);
      }
    });
  };

  NPM.prototype.getConfig = function getConfig(setting) {
    return new Promise(function (resolve, reject) {
      try {
        child_process.exec('npm config get ' + setting, { maxBuffer: 1024 * 1024 }, function (error, stdout, stderr) {
          if (!error) {
            resolve(stdout);
          } else {
            reject(error);
          }
        });
      } catch (e) {
        console.log('Error running "npm config get ' + setting + '"', e);
        reject(e);
      }
    });
  };

  NPM.prototype.ls = function ls(options) {
    return new Promise(function (resolve, reject) {
      try {
        child_process.exec('npm ls --json --silent', { cwd: options.workingDirectory, maxBuffer: 1024 * 1024 }, function (error, stdout, stderr) {
          if (stdout) {
            resolve(JSON.parse(stdout));
          } else {
            reject(error);
          }
        });
      } catch (e) {
        console.log('Error running "npm ls"', e);
        reject(e);
      }
    });
  };

  return NPM;
}();
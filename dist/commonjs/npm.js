'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NPM = undefined;

var _guid = require('./guid');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NPM = exports.NPM = function () {
  function NPM() {
    _classCallCheck(this, NPM);
  }

  NPM.prototype.setConfig = function setConfig(setting, value) {
    var child_process = System._nodeRequire('child_process');

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
    var child_process = System._nodeRequire('child_process');

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
    var child_process = System._nodeRequire('child_process');

    return new Promise(function (resolve, reject) {
      try {
        child_process.exec('npm ls --json --silent', { cwd: options.workingDirectory, maxBuffer: 1024 * 1024 }, function (error, stdout, stderr) {
          if (stdout) {
            resolve(JSON.parse(stdout));
          } else if (!error && !stdout) {
            resolve('');
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
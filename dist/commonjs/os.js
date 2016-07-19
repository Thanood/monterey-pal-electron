'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var os = System._nodeRequire('os');
var child_process = System._nodeRequire('child_process');

var OS = exports.OS = function () {
  function OS() {
    _classCallCheck(this, OS);
  }

  OS.prototype.getPlatform = function getPlatform() {
    return os.platform();
  };

  OS.prototype.getNodeVersion = function getNodeVersion() {
    return process.versions.node;
  };

  OS.prototype.getNPMVersion = function getNPMVersion() {
    var npm = System._nodeRequire('npm');
    return npm.version;
  };

  OS.prototype.getChromeVersion = function getChromeVersion() {
    return process.versions.chrome;
  };

  OS.prototype.getElectronVersion = function getElectronVersion() {
    return process.versions.electron;
  };

  return OS;
}();
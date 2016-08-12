'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var os = System._nodeRequire('os');
var child_process = System._nodeRequire('child_process');
var treeKill = System._nodeRequire('tree-kill');

var OS = exports.OS = function () {
  function OS() {
    _classCallCheck(this, OS);
  }

  OS.prototype.getPlatform = function getPlatform() {
    return os.platform();
  };

  OS.prototype.getEnv = function getEnv(key) {
    if (key) {
      return process.env[key];
    } else {
      return process.env;
    }
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

  OS.prototype.spawn = function spawn(cmd, args, options, stdout, stderr) {
    var proc = child_process.spawn(cmd, args, options);
    var resolve = void 0;
    var promise = new Promise(function (r) {
      return resolve = r;
    });

    proc.stdout.on('data', function (data) {
      stderr(data.toString());
    });

    proc.stderr.on('data', function (data) {
      stderr(data.toString());
    });

    proc.on('exit', function (code) {
      resolve(code);
    });

    return {
      process: proc,
      completion: promise
    };
  };

  OS.prototype.kill = function kill(process) {
    treeKill(process.pid, 'SIGKILL');
  };

  OS.prototype.exec = function exec(cmd, options) {
    return new Promise(function (resolve, reject) {
      child_process.exec(cmd, options, function (error, stdout, stderr) {
        if (stdout) {
          resolve(stdout);
        } else {
          reject(error);
        }
      });
    });
  };

  return OS;
}();
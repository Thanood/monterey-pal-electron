'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var os = System._nodeRequire('os');
var child_process = System._nodeRequire('child_process');
var treeKill = System._nodeRequire('tree-kill');
var shell = System._nodeRequire('electron').shell;

var OS = exports.OS = function () {
  function OS() {
    _classCallCheck(this, OS);

    this.processes = [];
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

    this.processes.push(proc);

    return {
      process: proc,
      completion: promise
    };
  };

  OS.prototype.kill = function kill(process) {
    var _this = this;

    return new Promise(function (resolve) {
      treeKill(process.pid, 'SIGKILL', function () {
        var index = _this.processes.indexOf(process);
        if (index > -1) {
          _this.processes.splice(index, 1);
        }

        resolve();
      });
    });
  };

  OS.prototype.exec = function exec(cmd, options) {
    return new Promise(function (resolve, reject) {
      child_process.exec(cmd, options, function (error, stdout, stderr) {
        if (!error) {
          resolve(stdout);
        } else {
          reject(error);
        }
      });
    });
  };

  OS.prototype.openItem = function openItem(path) {
    shell.openItem(path);
  };

  return OS;
}();
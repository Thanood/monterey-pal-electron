"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSPM = exports.JSPM = function () {
  function JSPM() {
    _classCallCheck(this, JSPM);

    this.isLoaded = false;
  }

  JSPM.prototype.install = function install(packages, options) {
    var _this = this;

    var system = System;
    var jspm = System._nodeRequire('jspm');
    System = system;
    var jspmOptions = options.jspmOptions || {};

    var originalWorkingDirectory = process.cwd();
    process.chdir(jspmOptions.workingDirectory || process.cwd());
    this._log(options, "chdir: " + jspmOptions.workingDirectory);

    jspm.setPackagePath(jspmOptions.workingDirectory);
    this._log(options, "installing...");
    return new Promise(function (resolve, reject) {
      jspm.install(true, jspmOptions).then(function () {
        _this._log(options, "finished installing...");
        process.chdir(originalWorkingDirectory);
        resolve();
      }).catch(function (error) {
        reject(error);
      });
    }).catch(function (error) {
      _this._log(options, "error while installing...", error);
      process.chdir(originalWorkingDirectory);
    });
  };

  JSPM.prototype._log = function _log(options, msg) {
    if (options.logCallback) {
      options.logCallback({ level: 'custom', message: msg });
    }
  };

  return JSPM;
}();
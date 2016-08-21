'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JSPM = undefined;

var _guid = require('./guid');

var _fs = require('./fs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var requireTaskPool = System._nodeRequire('electron-remote').requireTaskPool;
var jspmTaskPath = System._nodeRequire.resolve(__dirname + '/jspm_commands.js');
var ipcRenderer = System._nodeRequire('electron').ipcRenderer;

var path = System._nodeRequire('path');

var JSPM = exports.JSPM = function () {
  function JSPM() {
    _classCallCheck(this, JSPM);
  }

  JSPM.prototype.install = function install(deps, options) {
    var _this = this;

    var jspmModule = requireTaskPool(jspmTaskPath);

    options.guid = (0, _guid.createGUID)();
    ipcRenderer.on(options.guid, function (event, msg) {
      _this._log(options, msg);
    });

    this._log(options, 'installing...');
    return jspmModule.install(deps, {
      guid: options.guid,
      jspmOptions: options.jspmOptions,
      project: {
        packageJSONPath: options.project.packageJSONPath
      }
    }).then(function () {
      ipcRenderer.removeAllListeners(options.guid);
      _this._log(options, 'finished installing jspm packages');
    }).catch(function (error) {
      ipcRenderer.removeAllListeners(options.guid);
      _this._log(options, 'error while installing jspm packages, ' + error.message);
      throw error;
    });
  };

  JSPM.prototype.isJspmInstalled = function isJspmInstalled(packageJSONPath) {
    return new _fs.Fs().fileExists(path.join(this.getJSPMRootPath(packageJSONPath), 'jspm.js'));
  };

  JSPM.prototype.getJSPMRootPath = function getJSPMRootPath(projectPath) {
    return path.join(projectPath, 'node_modules', 'jspm');
  };

  JSPM.prototype.downloadLoader = function downloadLoader(options) {
    var _this2 = this;

    var jspmModule = requireTaskPool(jspmTaskPath);

    this._log(options, 'downloading systemjs loader...');
    return jspmModule.dlLoader({
      jspmOptions: options.jspmOptions,
      project: {
        packageJSONPath: options.project.packageJSONPath
      }
    }).then(function () {
      _this2._log(options, 'downloaded systemjs loader');
    }).catch(function (err) {
      _this2._log(options, 'error while downloading systemjs loader, ' + err.message);
      throw err;
    });
  };

  JSPM.prototype.getForks = function getForks(config, options) {
    var jspmModule = requireTaskPool(jspmTaskPath);
    return jspmModule.getForks(config, {
      jspmOptions: options.jspmOptions,
      project: {
        packageJSONPath: options.project.packageJSONPath
      }
    });
  };

  JSPM.prototype.getConfig = function getConfig(options) {
    var _this3 = this;

    var jspmModule = requireTaskPool(jspmTaskPath);

    options.guid = (0, _guid.createGUID)();

    ipcRenderer.on(options.guid, function (event, msg) {
      _this3._log(options, msg);
    });

    return jspmModule.getConfig({
      guid: options.guid,
      jspmOptions: options.jspmOptions,
      project: {
        packageJSONPath: options.project.packageJSONPath
      }
    }).then(function (config) {
      ipcRenderer.removeAllListeners(options.guid);
      return config;
    }).catch(function (e) {
      ipcRenderer.removeAllListeners(options.guid);
      throw e;
    });
  };

  JSPM.prototype._log = function _log(options, msg) {
    if (options.logCallback) {
      options.logCallback({ level: 'process', message: msg });
    }
  };

  return JSPM;
}();
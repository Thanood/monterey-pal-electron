'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JSPM = undefined;

var _guid = require('./guid');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var requireTaskPool = System._nodeRequire('electron-remote').requireTaskPool;
var jspmTaskPath = System._nodeRequire.resolve(__dirname + '/jspm_commands.js');
var ipcRenderer = System._nodeRequire('electron').ipcRenderer;

var JSPM = exports.JSPM = function () {
  function JSPM() {
    _classCallCheck(this, JSPM);
  }

  JSPM.prototype.install = function install(deps, options) {
    var _this = this;

    var jspmOptions = options.jspmOptions || {};
    var jspmModule = requireTaskPool(jspmTaskPath);

    jspmOptions.guid = (0, _guid.createGUID)();
    ipcRenderer.on(jspmOptions.guid, function (event, msg) {
      _this._log(options, msg);
    });

    this._log(options, 'installing...');
    return jspmModule.install(deps, jspmOptions).then(function () {
      ipcRenderer.removeAllListeners(jspmOptions.guid);
      _this._log(options, 'finished installing jspm packages');
    }).catch(function (error) {
      ipcRenderer.removeAllListeners(jspmOptions.guid);
      _this._log(options, 'error while installing jspm packages, ' + error.message);
      throw error;
    });
  };

  JSPM.prototype.downloadLoader = function downloadLoader(options) {
    var _this2 = this;

    var jspmOptions = options.jspmOptions || {};
    var jspmModule = requireTaskPool(jspmTaskPath);

    this._log(options, 'downloading systemjs loader...');
    return jspmModule.dlLoader(jspmOptions).then(function () {
      _this2._log(options, 'downloaded systemjs loader');
    }).catch(function (err) {
      _this2._log(options, 'error while downloading systemjs loader, ' + err.message);
      throw err;
    });
  };

  JSPM.prototype.getForks = function getForks(config, options) {
    var jspmOptions = options.jspmOptions || {};
    var jspmModule = requireTaskPool(jspmTaskPath);
    return jspmModule.getForks(config, jspmOptions);
  };

  JSPM.prototype.getConfig = function getConfig(projectPath, packageJSONPath) {
    var jspmModule = requireTaskPool(jspmTaskPath);

    return jspmModule.getConfig(projectPath, packageJSONPath);
  };

  JSPM.prototype._log = function _log(options, msg) {
    if (options.logCallback) {
      options.logCallback({ level: 'custom', message: msg });
    }
  };

  return JSPM;
}();
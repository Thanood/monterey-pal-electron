'use strict';

var _require = require('electron');

var ipcRenderer = _require.ipcRenderer;

var mainWindow = require('electron').remote.getGlobal('mainWindow');
var path = require('path');

exports.install = function (deps, options) {
  var jspm = exports.getJSPMModule(options.jspmModulesPath, 'api.js');
  jspm.setPackagePath(options.jspmOptions.workingDirectory);

  jspm.on('log', function (type, msg) {
    if (type === 'err') {
      throw new Error(msg);
    } else {
      mainWindow.webContents.send(options.guid, msg);
    }
  });

  return jspm.install(deps, options.jspmOptions);
};

exports.dlLoader = function (options) {
  var jspm = exports.getJSPMModule(options.jspmModulesPath, 'api.js');
  var jspmCore = exports.getJSPMModule(options.jspmModulesPath, 'lib', 'core.js');
  jspm.setPackagePath(options.jspmOptions.workingDirectory);
  return jspmCore.checkDlLoader();
};

exports.getJSPMModule = function (jspmModulesPath) {
  for (var _len = arguments.length, segments = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    segments[_key - 1] = arguments[_key];
  }

  var segs = Array.prototype.slice.call(segments);
  segs.unshift(jspmModulesPath);
  return require(path.join.apply(this, segs));
};

exports.getConfig = function (options) {
  var jspm = exports.getJSPMModule(options.jspmModulesPath, 'api.js');
  var jspmConfig = exports.getJSPMModule(options.jspmModulesPath, 'lib', 'config.js');
  var originalWorkingDirectory = process.cwd();
  process.chdir(path.dirname(options.project.packageJSONPath));
  jspm.setPackagePath(path.dirname(options.project.packageJSONPath));

  jspm.on('log', function (type, msg) {
    if (type === 'err') {
      throw new Error(msg);
    } else {
      mainWindow.webContents.send(options.guid, msg);
    }
  });

  return jspmConfig.load().then(function () {
    process.chdir(originalWorkingDirectory);
    return jspmConfig;
  }).catch(function (e) {
    process.chdir(originalWorkingDirectory);

    throw e;
  });
};

exports.getForks = function (config, options) {
  var jspm = exports.getJSPMModule(options.jspmModulesPath, 'api.js');
  var semver = exports.getJSPMModule(options.jspmModulesPath, 'lib', 'semver');
  jspm.setPackagePath(options.jspmOptions.workingDirectory);

  var installed = config.loader;
  var versions = {};
  var result = [];
  var linkedVersions = {};

  function addDep(dep) {
    var vList = versions[dep.name] = versions[dep.name] || [];
    var version = dep.version;
    if (vList.indexOf(version) === -1) vList.push(version);
  }

  Object.keys(installed.baseMap).forEach(function (dep) {
    addDep(installed.baseMap[dep]);
  });

  Object.keys(installed.depMap).forEach(function (parent) {
    var curMap = installed.depMap[parent];
    Object.keys(curMap).forEach(function (dep) {
      addDep(curMap[dep]);
    });
  });

  Object.keys(versions).forEach(function (dep) {
    var vList = versions[dep].sort(semver.compare).map(function (version) {
      if (linkedVersions[dep + '@' + version]) {
        return '%' + version + '%';
      } else {
        return '`' + version + '`';
      }
    });

    if (vList.length > 1) {
      result.push({
        dep: dep,
        versions: vList
      });
    }
  });

  return result;
};
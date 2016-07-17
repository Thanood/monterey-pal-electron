'use strict';

var _require = require('electron');

var ipcRenderer = _require.ipcRenderer;

var mainWindow = require('electron').remote.getGlobal('mainWindow');
var path = require('path');

exports.install = function (deps, options) {
  if (!options.project.packageJSONPath) throw new Error('project.packageJSONPath is required');
  if (!options.jspmOptions.workingDirectory) throw new Error('jspmOptions.workingDirectory is required');

  var jspm = exports.getJSPMModule(options.project.packageJSONPath, 'api.js');
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
  if (!options.project.packageJSONPath) throw new Error('project.packageJSONPath is required');
  if (!options.jspmOptions.workingDirectory) throw new Error('jspmOptions.workingDirectory is required');

  var jspm = exports.getJSPMModule(options.project.packageJSONPath, 'api.js');
  var jspmCore = exports.getJSPMModule(options.project.packageJSONPath, 'lib', 'core.js');
  jspm.setPackagePath(options.jspmOptions.workingDirectory);
  return jspmCore.checkDlLoader();
};

exports.getJSPMRootPath = function (packageJSONPath) {
  return path.join(path.dirname(packageJSONPath), 'node_modules', 'jspm');
};

exports.getJSPMModule = function (packageJSONPath) {
  for (var _len = arguments.length, segments = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    segments[_key - 1] = arguments[_key];
  }

  var segs = Array.prototype.slice.call(segments);
  segs.unshift(exports.getJSPMRootPath(packageJSONPath));
  return require(path.join.apply(this, segs));
};

exports.getConfig = function (options) {
  if (!options.project.packageJSONPath) throw new Error('project.packageJSONPath is required');

  var jspm = exports.getJSPMModule(options.project.packageJSONPath, 'api.js');
  var jspmConfig = exports.getJSPMModule(options.project.packageJSONPath, 'lib', 'config.js');
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
  if (!options.jspmOptions.workingDirectory) throw new Error('jspmOptions.workingDirectory is required');
  if (!options.project.packageJSONPath) throw new Error('project.packageJSONPath is required');

  var jspm = exports.getJSPMModule(options.project.packageJSONPath, 'api.js');
  var semver = exports.getJSPMModule(options.project.packageJSONPath, 'lib', 'semver');
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
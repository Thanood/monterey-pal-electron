'use strict';

var _require = require('electron');

var ipcRenderer = _require.ipcRenderer;

var jspm = require('jspm');
var jspmConfig = require('jspm/lib/config.js');
var jspmCore = require('jspm/lib/core.js');
var mainWindow = require('electron').remote.getGlobal('mainWindow');
var semver = require('jspm/lib//semver');

exports.install = function (deps, jspmOptions) {
  var jspm = require('jspm');
  jspm.setPackagePath(jspmOptions.workingDirectory);

  jspm.on('log', function (type, msg) {
    if (type === 'err') {
      throw new Error(msg);
    } else {
      mainWindow.webContents.send(jspmOptions.guid, msg);
    }
  });

  return jspm.install(deps, jspmOptions);
};

exports.dlLoader = function (jspmOptions) {
  var jspm = require('jspm');
  jspm.setPackagePath(jspmOptions.workingDirectory);
  return jspmCore.checkDlLoader();
};

exports.getConfig = function (projectPath, packageJSONPath) {
  var originalWorkingDirectory = process.cwd();
  process.chdir(projectPath);
  jspm.setPackagePath(packageJSONPath);

  return jspmConfig.load().then(function () {
    process.chdir(originalWorkingDirectory);
    return jspmConfig;
  }).catch(function (e) {
    process.chdir(originalWorkingDirectory);

    throw e;
  });
};

exports.getForks = function (config, jspmOptions) {
  var jspm = require('jspm');
  jspm.setPackagePath(jspmOptions.workingDirectory);

  return new Promise(function (resolve, reject) {

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

    resolve(result);
  });
};
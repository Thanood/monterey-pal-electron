'use strict';

const {ipcRenderer} = require('electron');
const mainWindow = require('electron').remote.getGlobal('mainWindow');
const path = require('path');

exports.install = function (deps, options) {
  let jspm = exports.getJSPMModule(options.jspmModulesPath, 'api.js');
  jspm.setPackagePath(options.jspmOptions.workingDirectory);

  jspm.on('log', (type, msg) => {
    if (type === 'err') {
      throw new Error(msg);
    } else {
      //we send to the guid only, so we know where it ends up, this way we have no global listeners
      mainWindow.webContents.send(options.guid, msg);
    }
  });

  return jspm.install(deps, options.jspmOptions);
};


exports.dlLoader = function (options) {
  let jspm = exports.getJSPMModule(options.jspmModulesPath, 'api.js');
  let jspmCore = exports.getJSPMModule(options.jspmModulesPath, 'lib', 'core.js');
  jspm.setPackagePath(options.jspmOptions.workingDirectory);
  return jspmCore.checkDlLoader();
};

exports.getJSPMModule = function(jspmModulesPath, ...segments) {
  let segs = Array.prototype.slice.call(segments);
  segs.unshift(jspmModulesPath);
  return require(path.join.apply(this, segs));
}

exports.getConfig = function (options) {
  let jspm = exports.getJSPMModule(options.jspmModulesPath, 'api.js');
  let jspmConfig = exports.getJSPMModule(options.jspmModulesPath, 'lib', 'config.js');
  let originalWorkingDirectory = process.cwd();
  process.chdir(path.dirname(options.project.packageJSONPath));
  jspm.setPackagePath(path.dirname(options.project.packageJSONPath));

  jspm.on('log', (type, msg) => {
    if (type === 'err') {
      throw new Error(msg);
    } else {
      mainWindow.webContents.send(options.guid, msg);
    }
  });

  return jspmConfig.load()
    .then(() => {
      process.chdir(originalWorkingDirectory);
      return jspmConfig;
    }).catch((e) => {
      process.chdir(originalWorkingDirectory);

      throw e;
    });
};


exports.getForks = function (config, options) {
  let jspm = exports.getJSPMModule(options.jspmModulesPath, 'api.js');
  let semver = exports.getJSPMModule(options.jspmModulesPath, 'lib', 'semver');
  jspm.setPackagePath(options.jspmOptions.workingDirectory);

  let installed = config.loader;
  var versions = {};
  var result = [];
  var linkedVersions = {};

  //source: https://github.com/jspm/jspm-cli/blob/master/lib/install.js#L779-L854
  function addDep(dep) {
    var vList = versions[dep.name] = versions[dep.name] || [];
    var version = dep.version;
    if (vList.indexOf(version) === -1)
      vList.push(version);
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
      }
      else {
        return '`' + version + '`';
      }
    });

    if (vList.length > 1) {
      result.push({
        dep: dep,
        versions: vList
      })
    }
  });

  return result;
}

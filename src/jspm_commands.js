const {ipcRenderer} = require('electron');
const jspm = require('jspm');
const jspmConfig = require('jspm/lib/config.js');
const jspmCore = require('jspm/lib/core.js');
const mainWindow = require('electron').remote.getGlobal('mainWindow');
const semver = require('jspm/lib//semver');


exports.install = function (deps, jspmOptions) {
  let jspm = require('jspm');
  jspm.setPackagePath(jspmOptions.workingDirectory);

  jspm.on('log', (type, msg) => {
    if (type === 'err') {
      throw new Error(msg);
    } else {
      //we send to the guid only, so we know where it ends up, this way we have no global listeners
      mainWindow.webContents.send(jspmOptions.guid, msg);
    }
  });

  return jspm.install(deps, jspmOptions);
};


exports.dlLoader = function (jspmOptions) {
  let jspm = require('jspm');
  jspm.setPackagePath(jspmOptions.workingDirectory);
  return jspmCore.checkDlLoader();
};


exports.getConfig = function (projectPath, packageJSONPath) {
  let originalWorkingDirectory = process.cwd();
  process.chdir(projectPath);
  jspm.setPackagePath(packageJSONPath);

  return jspmConfig.load()
    .then(() => {
      process.chdir(originalWorkingDirectory);
      return jspmConfig;
    }).catch((e) => {
      process.chdir(originalWorkingDirectory);

      throw e;
    });
};


exports.getForks = function (config, jspmOptions) {
  let jspm = require('jspm');
  jspm.setPackagePath(jspmOptions.workingDirectory);

  return new Promise((resolve, reject) => {

    //source for the madness : https://github.com/jspm/jspm-cli/blob/master/lib/install.js#L779-L854

    let installed = config.loader;
    var versions = {};
    var result = [];
    var linkedVersions = {};

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

    resolve(result)
  });
}

exports.install = function (packages, options) {
  let node_modules = require('electron').remote.getGlobal('node_modules');
  const npm = require(require('module')._resolveFilename('npm', { paths: [node_modules] }));
  let npmOptions = options.npmOptions || {};

  let originalWorkingDirectory = process.cwd();
  process.chdir(npmOptions.workingDirectory || process.cwd());
  _log(options, `chdir: ${npmOptions.workingDirectory}`);

  return exports.load(npm, npmOptions)
    .then(() => {

      npm.registry.log.on('log', (msg) => {
        _log(options, msg.message, msg.level);
      });

      _log(options, "loaded");
      return new Promise((resolve, reject) => {

        _log(options, "installing...");
        npm.commands.install(packages, error => {
          console.log(packages);
          console.log(error);
          _log(options, "finished installing...");
          process.chdir(originalWorkingDirectory);

          resolve();
        });
      });
    }).catch(error => {
      process.chdir(originalWorkingDirectory);
      throw error;
    });
}

exports.load = function (npm, options, error) {
  return new Promise((resolve, reject) => {
    npm.load(options, error => {
      if (error) reject(error);
      else {
        resolve();
      }
    });
  });
}

function _log (options, msg, level = 'process') {
  let mainWindow = require('electron').remote.getGlobal('mainWindow');
  mainWindow.webContents.send(options.guid, { level: level, message: msg});
}
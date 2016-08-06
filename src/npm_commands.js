let mainWindow = require('electron').remote.getGlobal('mainWindow');

exports.install = function (packages, options) {
  const npm = require('npm');
  let npmOptions = options.npmOptions || {};

  let originalWorkingDirectory = process.cwd();
  process.chdir(npmOptions.workingDirectory || process.cwd());
  exports._log(options, `chdir: ${npmOptions.workingDirectory}`);

  return exports.load(npm, npmOptions)
    .then(() => {

      npm.registry.log.on('log', (msg) => {
        exports._log(options, msg.message, msg.level);
      });

      exports._log(options, "loaded");
      return new Promise((resolve, reject) => {

        exports._log(options, "installing...");
        npm.commands.install(packages, error => {
          console.log(packages);
          console.log(error);
          exports._log(options, "finished installing...");
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

exports._log = function (options, msg, level = 'process') {
  mainWindow.webContents.send(options.guid, { level: level, message: msg});
}
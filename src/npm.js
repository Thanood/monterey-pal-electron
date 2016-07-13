let child_process = System._nodeRequire('child_process');

export class NPM {
  install (packages, options) {
    const npm = System._nodeRequire('npm');
    let npmOptions = options.npmOptions || {};

    let originalWorkingDirectory = process.cwd();
    process.chdir(npmOptions.workingDirectory || process.cwd());
    this._log(options, `chdir: ${npmOptions.workingDirectory}`);

    return this.load(npm, npmOptions)
      .then(() => {

        if (options.logCallback) {
          npm.registry.log.on('log', function (message) {
            options.logCallback(message);
          });
        }

        this._log(options, "loaded");
        return new Promise((resolve, reject) => {

          this._log(options, "installing...");
          npm.commands.install(packages, error => {
            this._log(options, "finished installing...", error);
            process.chdir(originalWorkingDirectory);

            if (error) reject(error);
            else resolve();
          });
        });
      }).catch(error => {
        process.chdir(originalWorkingDirectory);
        throw error;
      });
  }

  load (npm, options, error) {
    return new Promise((resolve, reject) => {
      npm.load(options, error => {
        if (error) reject(error);
        else {
          resolve();
        }
      });
    });
  }

  ls(options) {
    return new Promise((resolve, reject) => {
      try {
        // we can talk to the npm cli directly but the ls cmd does not return anything, it just outputs to console
        // perhaps we can monkey patch the ui.log function and get the data from there
        child_process.exec('npm ls --json --silent', { cwd: options.workingDirectory, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
          resolve(JSON.parse(stdout));
        });
      } catch (e) {
        console.log('Error running "npm ls"', e);
        reject(e);
      }
    });
  }

  _log(options, msg) {
    if (options.logCallback) {
      options.logCallback({level: 'custom', message: msg });
    }
  }
}

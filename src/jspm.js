export class JSPM {
  isLoaded = false;

  install (packages, options) {
    var system = System;
    const jspm = System._nodeRequire('jspm');
    System = system;
    let jspmOptions = options.jspmOptions || {};

    let originalWorkingDirectory = process.cwd();
    process.chdir(jspmOptions.workingDirectory || process.cwd());
    this._log(options, `chdir: ${jspmOptions.workingDirectory}`);

    jspm.setPackagePath(jspmOptions.workingDirectory);
    this._log(options, "installing...");
    return new Promise((resolve, reject) => {
      jspm.install(true, jspmOptions).then(() => {
        this._log(options, "finished installing...");
        process.chdir(originalWorkingDirectory);
        resolve();
      }).catch(error => {
        reject(error);
      });
    }).catch(error => {
      this._log(options, "error while installing...", error);
        process.chdir(originalWorkingDirectory);
    });
  }

  _log(options, msg) {
    if (options.logCallback) {
      options.logCallback({level: 'custom', message: msg });
    }
  }
}

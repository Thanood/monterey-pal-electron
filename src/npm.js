import {createGUID} from './guid';

export class NPM {
  setConfig(setting, value) {
    let child_process = System._nodeRequire('child_process');

    return new Promise((resolve, reject) => {
      try {
        child_process.exec(`npm config set ${setting} ${value}`, { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
          if (!error) {
            resolve(stdout);
          } else {
            reject(error);
          }
        });
      } catch (e) {
        console.log(`Error running "npm config set ${setting} ${value}"`, e);
        reject(e);
      }
    });
  }

  getConfig(setting) {
    let child_process = System._nodeRequire('child_process');

    return new Promise((resolve, reject) => {
      try {
        child_process.exec(`npm config get ${setting}`, { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
          if (!error) {
            resolve(stdout);
          } else {
            reject(error);
          }
        });
      } catch (e) {
        console.log(`Error running "npm config get ${setting}"`, e);
        reject(e);
      }
    });
  }

  ls(options) {
    let child_process = System._nodeRequire('child_process');

    return new Promise((resolve, reject) => {
      try {
        child_process.exec(`npm ls --json --silent`, { cwd: options.workingDirectory, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
          if (stdout) {
            resolve(JSON.parse(stdout));
          } else if (!error && !stdout) {
            resolve('');
          } else {
            reject(error);
          }
        });
      } catch (e) {
        console.log('Error running "npm ls"', e);
        reject(e);
      }
    });
  }
}

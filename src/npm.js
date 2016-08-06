let child_process = System._nodeRequire('child_process');
let path = System._nodeRequire('path');
let os = System._nodeRequire('os');
let requireTaskPool = System._nodeRequire('electron-remote').requireTaskPool;
let npmTaskPath = System._nodeRequire.resolve(__dirname + '/npm_commands.js');
let ipcRenderer = System._nodeRequire('electron').ipcRenderer;
import {createGUID} from './guid';

export class NPM {
  install (deps, options) {

    options.guid = createGUID();
    ipcRenderer.on(options.guid, (event, msg) => {
      if (options.logCallback) {
        options.logCallback(msg);
      }
    });

    let npmModule = requireTaskPool(npmTaskPath);

    return npmModule.install(deps, options).then(()=> {
      ipcRenderer.removeAllListeners(options.guid);
    }).catch(error => {
      ipcRenderer.removeAllListeners(options.guid);
      throw error;
    });
  }

  ls(options) {
    return new Promise((resolve, reject) => {
      try {
        // https://github.com/monterey-framework/monterey/issues/100
        let npmPath = os.platform() === 'darwin' ? '/usr/local/bin/npm' : 'npm';

        // we can talk to the npm cli directly but the ls cmd does not return anything, it just outputs to console
        // perhaps we can monkey patch the ui.log function and get the data from there
        child_process.exec(`${npmPath} ls --json --silent`, { cwd: options.workingDirectory, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
          if (stdout) {
            resolve(JSON.parse(stdout));
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

'use strict';

const requireTaskPool = System._nodeRequire('electron-remote').requireTaskPool;
const jspmTaskPath = System._nodeRequire.resolve(__dirname + '/jspm_commands.js');
const ipcRenderer = System._nodeRequire('electron').ipcRenderer;
import {createGUID} from './guid';
const path = System._nodeRequire('path');
import {Fs} from './fs';

export class JSPM {
  install (deps, options) {
    let jspmModule = requireTaskPool(jspmTaskPath);

    //add guid we will use for messaging between window && add listener for the guid
    options.guid = createGUID();
    ipcRenderer.on(options.guid, (event, msg) => {
      this._log(options, msg);
    });

    this._log(options, 'installing...');
    return jspmModule.install(deps, {
      guid: options.guid,
      jspmOptions: options.jspmOptions,
      project: {
        packageJSONPath: options.project.packageJSONPath
      }  
    }).then(()=> {
      ipcRenderer.removeAllListeners(options.guid);
      this._log(options, 'finished installing jspm packages');
    }).catch(error => {
      ipcRenderer.removeAllListeners(options.guid);
      this._log(options, `error while installing jspm packages, ${error.message}`);
      throw error;
    });
  }

  isJspmInstalled(packageJSONPath) {
    return new Fs().fileExists(path.join(this.getJSPMRootPath(packageJSONPath), 'jspm.js'));
  }

  getJSPMRootPath(projectPath) {
    return path.join(projectPath, 'node_modules', 'jspm');
  }

  downloadLoader(options) {
    let jspmModule = requireTaskPool(jspmTaskPath);

    this._log(options, 'downloading systemjs loader...');
    return jspmModule.dlLoader({
      jspmOptions: options.jspmOptions,
      project: {
        packageJSONPath: options.project.packageJSONPath
      }  
    })
    .then(() => {
      this._log(options, `downloaded systemjs loader`);
    }).catch(err => {
      this._log(options, `error while downloading systemjs loader, ${err.message}`);
      throw err;
    });
  }

  getForks(config, options) {
    let jspmModule = requireTaskPool(jspmTaskPath);
    return jspmModule.getForks(config, {
      jspmOptions: options.jspmOptions,
      project: {
        packageJSONPath: options.project.packageJSONPath
      }  
    })
  }

  getConfig(options) {
    let jspmModule = requireTaskPool(jspmTaskPath);

    options.guid = createGUID();

    ipcRenderer.on(options.guid, (event, msg) => {
      this._log(options,msg);
    });

    return jspmModule.getConfig({
      guid: options.guid,
      jspmOptions: options.jspmOptions,
      project: {
        packageJSONPath: options.project.packageJSONPath
      }  
    })
    .then(config => {
      ipcRenderer.removeAllListeners(options.guid);
      return config;
    })
    .catch(e => {
      ipcRenderer.removeAllListeners(options.guid);
      throw e;
    })
  }

  _log(options, msg) {
    if (options.logCallback) {
      options.logCallback({level: 'process', message: msg });
    }
  }
}

export class OS {
  processes = [];

  getPlatform() {
    const os = System._nodeRequire('os');
    return os.platform();
  }

  getEnv(key) {
    if (key) {
      return process.env[key];
    } else {
      return process.env;
    }
  }

  getNodeVersion() {
    return process.versions.node;
  }

  getNPMVersion() {
    const npm = System._nodeRequire('npm');
    return npm.version;
  }

  getChromeVersion() {
    return process.versions.chrome;
  }

  getElectronVersion() {
    return process.versions.electron;
  }

  // executes command, streams stdout + stderr
  spawn(cmd, args, options, stdout, stderr) {
    const child_process = System._nodeRequire('child_process');
    let proc = child_process.spawn(cmd, args, options);
    let resolve;
    let promise = new Promise(r => resolve = r);

    proc.stdout.on('data', (data) => {
      stdout(data.toString());
    });

    proc.stderr.on('data', (data) => {
      stderr(data.toString());
    });

    proc.on('exit', (code) => {
      resolve(code);
    });

    this.processes.push(proc);

    return {
      process: proc,
      completion: promise
    };
  }

  kill(process) {
    const treeKill = System._nodeRequire('tree-kill');
    return new Promise(resolve => {
      treeKill(process.pid, 'SIGKILL', () => {
        // remove process from processes list
        let index = this.processes.indexOf(process);
        if(index > -1) {
          this.processes.splice(index, 1);
        }

        resolve();
      });
    });
  }

  // execute command, resolve when everything has been written to stdout / stderr
  exec(cmd, options) {
    const child_process = System._nodeRequire('child_process');
    return new Promise((resolve, reject) => {
      child_process.exec(cmd, options, (error, stdout, stderr) => {
        if (!error) {
          resolve(stdout);
        } else {
          reject(error);
        }
      });
    });
  }

  openItem(path) {
    const shell = System._nodeRequire('electron').shell;
    shell.openItem(path);
  }
}

const os = System._nodeRequire('os');
let child_process = System._nodeRequire('child_process');
let treeKill = System._nodeRequire('tree-kill');

export class OS {
  getPlatform() {
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
    let proc = child_process.spawn(cmd, args, options);
    let resolve;
    let promise = new Promise(r => resolve = r);

    proc.stdout.on('data', (data) => {
      stderr(data.toString());
    });

    proc.stderr.on('data', (data) => {
      stderr(data.toString());
    });

    proc.on('exit', (code) => {
      resolve(code);
    });

    return {
      process: proc,
      completion: promise
    };
  }

  kill(process) {
    treeKill(process.pid, 'SIGKILL');
  }

  // execute command, resolve when everything has been written to stdout / stderr
  exec(cmd, options) {
    return new Promise((resolve, reject) => {
      child_process.exec(cmd, options, (error, stdout, stderr) => {
        if (stdout) {
          resolve(stdout);
        } else {
          reject(error);
        }
      });
    });
  }
}

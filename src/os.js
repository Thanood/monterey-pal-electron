const os = System._nodeRequire('os');
let child_process = System._nodeRequire('child_process');

export class OS {
  getPlatform() {
    return os.platform();
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
}

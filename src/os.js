const os = System._nodeRequire('os');

export class OS {
  getPlatform() {
    return os.platform();
  }
}

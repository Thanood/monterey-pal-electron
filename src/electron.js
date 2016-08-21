const electron = System._nodeRequire('electron');
const remote   = System._nodeRequire('electron').remote;

export class Electron {
  getIpcRenderer() {
    return electron.ipcRenderer;
  }

  getPty() {
    var pty = System._nodeRequire('pty.js');
    return pty;
  }

  getxTerm() {
    var xterm = System._nodeRequire('xterm');
    return xterm;
  }

  getPath(name) {
    let app = remote.getGlobal('app');
    return app.getPath(name);
  }

  getGlobal(name) {
    return remote.getGlobal(name);
  }
}
export class Electron {
  getIpcRenderer() {
    const electron = System._nodeRequire('electron');
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
    const remote   = System._nodeRequire('electron').remote;
    let app = remote.getGlobal('app');
    return app.getPath(name);
  }

  getGlobal(name) {
    const remote   = System._nodeRequire('electron').remote;
    return remote.getGlobal(name);
  }
}
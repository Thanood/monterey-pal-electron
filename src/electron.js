const electron = System._nodeRequire('electron');


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
}
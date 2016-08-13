const electron = System._nodeRequire('electron');
const pty = System._nodeRequire('pty.js');
const xterm = System._nodeRequire('xterm');

export class Electron {
  getIpcRenderer() {
    return electron.ipcRenderer;
  }

  getPty() {
    return pty;
  }

  getxTerm() {
    return xterm;
  }
}
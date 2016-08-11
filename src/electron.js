const electron = System._nodeRequire('electron');

export class Electron {
  getIpcRenderer() {
    return electron.ipcRenderer;
  }
}
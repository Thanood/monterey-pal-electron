'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var electron = System._nodeRequire('electron');
var remote = System._nodeRequire('electron').remote;

var Electron = exports.Electron = function () {
  function Electron() {
    _classCallCheck(this, Electron);
  }

  Electron.prototype.getIpcRenderer = function getIpcRenderer() {
    return electron.ipcRenderer;
  };

  Electron.prototype.getPty = function getPty() {
    var pty = System._nodeRequire('pty.js');
    return pty;
  };

  Electron.prototype.getxTerm = function getxTerm() {
    var xterm = System._nodeRequire('xterm');
    return xterm;
  };

  Electron.prototype.getPath = function getPath(name) {
    var app = remote.getGlobal('app');
    return app.getPath(name);
  };

  Electron.prototype.getGlobal = function getGlobal(name) {
    return remote.getGlobal(name);
  };

  return Electron;
}();
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var electron = System._nodeRequire('electron');
var pty = System._nodeRequire('pty.js');
var xterm = System._nodeRequire('xTerm');

var Electron = exports.Electron = function () {
  function Electron() {
    _classCallCheck(this, Electron);
  }

  Electron.prototype.getIpcRenderer = function getIpcRenderer() {
    return electron.ipcRenderer;
  };

  Electron.prototype.getPty = function getPty() {
    return pty;
  };

  Electron.prototype.getxTerm = function getxTerm() {
    return xterm;
  };

  return Electron;
}();
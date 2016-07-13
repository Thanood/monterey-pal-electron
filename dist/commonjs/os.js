'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var os = System._nodeRequire('os');

var OS = exports.OS = function () {
  function OS() {
    _classCallCheck(this, OS);
  }

  OS.prototype.getPlatform = function getPlatform() {
    return os.platform();
  };

  return OS;
}();
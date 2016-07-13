'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var storage = System._nodeRequire('electron-json-storage');

var Session = exports.Session = function () {
  function Session() {
    _classCallCheck(this, Session);
  }

  Session.prototype.get = function get(key) {
    return new Promise(function (resolve, reject) {
      storage.get(key, function (error, data) {
        if (error) reject(error);

        resolve(data);
      });
    });
  };

  Session.prototype.set = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(key, value) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', new Promise(function (resolve, reject) {
                storage.set(key, value, function (error) {
                  if (error) reject(error);

                  resolve();
                });
              }));

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function set(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return set;
  }();

  Session.prototype.clear = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', new Promise(function (resolve) {
                storage.clear(function (error) {
                  if (error) reject(error);

                  resolve();
                });
              }));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function clear() {
      return _ref2.apply(this, arguments);
    }

    return clear;
  }();

  Session.prototype.has = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(key) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt('return', new Promise(function (resolve) {
                storage.has(key, function (error, hasKey) {
                  if (error) resolve(error);

                  resolve(hasKey);
                });
              }));

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function has(_x3) {
      return _ref3.apply(this, arguments);
    }

    return has;
  }();

  return Session;
}();
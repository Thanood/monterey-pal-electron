'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var temp = System._nodeRequire('temp').track();

var Fs = exports.Fs = function () {
  function Fs() {
    _classCallCheck(this, Fs);
  }

  Fs.prototype.readFile = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(filePath) {
      var fs;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fs = System._nodeRequire('fs');
              return _context.abrupt('return', new Promise(function (resolve, reject) {
                fs.readFile(filePath, 'utf8', function (err, data) {
                  if (err) {
                    reject(err);
                  }
                  resolve(data);
                });
              }));

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function readFile(_x) {
      return _ref.apply(this, arguments);
    }

    return readFile;
  }();

  Fs.prototype.fileExists = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(p) {
      var fs;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              fs = System._nodeRequire('fs');
              return _context2.abrupt('return', new Promise(function (resolve, reject) {
                fs.stat(p, function (err, stat) {
                  if (err === null) {
                    resolve(true);
                  } else if (err.code === 'ENOENT') {
                    resolve(false);
                  } else {
                    reject(err);
                  }
                });
              }));

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function fileExists(_x2) {
      return _ref2.apply(this, arguments);
    }

    return fileExists;
  }();

  Fs.prototype.createFolder = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(p) {
      var mkdirp;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              mkdirp = System._nodeRequire('mkdirp');
              return _context3.abrupt('return', new Promise(function (resolve, reject) {
                mkdirp(p, function (err) {
                  if (err) reject(err);
                  resolve();
                });
              }));

            case 2:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function createFolder(_x3) {
      return _ref3.apply(this, arguments);
    }

    return createFolder;
  }();

  Fs.prototype.folderExists = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(p) {
      var fs;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              fs = System._nodeRequire('fs');
              return _context4.abrupt('return', new Promise(function (resolve, reject) {
                fs.stat(p, function (err, stat) {
                  if (err) {
                    resolve(false);
                  } else {
                    resolve(true);
                  }
                });
              }));

            case 2:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function folderExists(_x4) {
      return _ref4.apply(this, arguments);
    }

    return folderExists;
  }();

  Fs.prototype.writeFile = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(path, content) {
      var fs;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              fs = System._nodeRequire('fs');
              return _context5.abrupt('return', new Promise(function (resolve, reject) {
                fs.writeFile(path, content, function (err) {
                  if (err) reject(err);

                  resolve();
                });
              }));

            case 2:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function writeFile(_x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return writeFile;
  }();

  Fs.prototype.showOpenDialog = function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(config) {
      var dialog;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              dialog = System._nodeRequire('electron').remote.dialog;
              return _context6.abrupt('return', new Promise(function (resolve) {
                dialog.showOpenDialog(config, function (c) {
                  return resolve(c);
                });
              }));

            case 2:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function showOpenDialog(_x7) {
      return _ref6.apply(this, arguments);
    }

    return showOpenDialog;
  }();

  Fs.prototype.getDirName = function getDirName(p) {
    var path = System._nodeRequire('path');
    var split = p.split(path.sep);
    if (p.endsWith(path.sep)) {
      return split[split.length - 2];
    }

    return split[split.length - 1];
  };

  Fs.prototype.getFolderPath = function getFolderPath(p) {
    var path = System._nodeRequire('path');
    return path.dirname(p);
  };

  Fs.prototype.join = function join() {
    var path = System._nodeRequire('path');

    for (var _len = arguments.length, segments = Array(_len), _key = 0; _key < _len; _key++) {
      segments[_key] = arguments[_key];
    }

    return path.join.apply(null, segments);
  };

  Fs.prototype.getTempFile = function () {
    var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt('return', new Promise(function (resolve, reject) {
                temp.open('monterey', function (err, info) {
                  if (err) {
                    reject(err);
                    return;
                  }

                  resolve(info.path);
                });
              }));

            case 1:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function getTempFile() {
      return _ref7.apply(this, arguments);
    }

    return getTempFile;
  }();

  Fs.prototype.getTempFolder = function () {
    var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt('return', new Promise(function (resolve, reject) {
                temp.mkdir('monterey', function (err, dirPath) {
                  if (err) {
                    reject(err);
                    return;
                  }

                  resolve(dirPath);
                });
              }));

            case 1:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function getTempFolder() {
      return _ref8.apply(this, arguments);
    }

    return getTempFolder;
  }();

  Fs.prototype.move = function () {
    var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(from, to) {
      var mv;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              mv = System._nodeRequire('mv');
              return _context9.abrupt('return', new Promise(function (resolve, reject) {
                mv(from, to, { mkdirp: true }, function (err) {
                  if (err) {
                    reject(err);
                    return;
                  }

                  resolve();
                });
              }));

            case 2:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function move(_x8, _x9) {
      return _ref9.apply(this, arguments);
    }

    return move;
  }();

  Fs.prototype.getRootDir = function getRootDir() {
    var remote = System._nodeRequire('electron').remote;
    return remote.getGlobal('rootDir');
  };

  Fs.prototype.getGlobalNodeModulesPath = function getGlobalNodeModulesPath() {
    return System._nodeRequire('global-modules');
  };

  Fs.prototype.normalize = function normalize(p) {
    var path = System._nodeRequire('path');
    return path.normalize(p);
  };

  Fs.prototype.unzip = function () {
    var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(zipPath, outPath) {
      var _this = this;

      var yauzl, fs, path, mkdirp;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              yauzl = System._nodeRequire('yauzl');
              fs = System._nodeRequire('fs');
              path = System._nodeRequire('path');
              mkdirp = System._nodeRequire('mkdirp');
              return _context10.abrupt('return', new Promise(function (resolve, reject) {
                yauzl.open(zipPath, { autoClose: true, lazyEntries: true }, function (err, zipfile) {
                  if (err) reject(err);
                  zipfile.readEntry();
                  zipfile.on('close', function () {
                    return resolve();
                  });
                  zipfile.on('error', function () {
                    return reject();
                  });
                  zipfile.on('entry', function (entry) {
                    if (/\/$/.test(entry.fileName)) {
                      mkdirp(_this.join(outPath, entry.fileName), function (err1) {
                        if (err1) reject(err1);
                        zipfile.readEntry();
                      });
                    } else {
                      zipfile.openReadStream(entry, function (err2, readStream) {
                        if (err2) reject(err2);

                        mkdirp(path.dirname(_this.join(outPath, entry.fileName)), function (err3) {
                          if (err3) reject(err3);
                          readStream.pipe(fs.createWriteStream(_this.join(outPath, entry.fileName)));
                          readStream.on('end', function () {
                            zipfile.readEntry();
                          });
                        });
                      });
                    }
                  });
                });
              }));

            case 5:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function unzip(_x10, _x11) {
      return _ref10.apply(this, arguments);
    }

    return unzip;
  }();

  Fs.prototype.getDirectories = function () {
    var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(p) {
      var fs, path;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              fs = System._nodeRequire('fs');
              path = System._nodeRequire('path');
              return _context11.abrupt('return', new Promise(function (resolve, reject) {
                fs.readdir(p, function (err, files) {
                  if (err) {
                    reject(err);
                    return;
                  }

                  resolve(files.filter(function (file) {
                    return fs.statSync(path.join(p, file)).isDirectory();
                  }));
                });
              }));

            case 3:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function getDirectories(_x12) {
      return _ref11.apply(this, arguments);
    }

    return getDirectories;
  }();

  Fs.prototype.cleanupTemp = function cleanupTemp() {
    temp.cleanupSync();
  };

  Fs.prototype.access = function access(p, flags) {
    var fs = System._nodeRequire('fs');
    return new Promise(function (resolve, reject) {
      fs.access(p, flags, function (err) {
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      });
    });
  };

  Fs.prototype.readdir = function readdir(p) {
    var fs = System._nodeRequire('fs');
    return new Promise(function (resolve, reject) {
      fs.readdir(p, function (err, files) {
        if (err) {
          reject(err);
          return;
        }
        resolve(files);
      });
    });
  };

  Fs.prototype.unlink = function unlink(p) {
    return new Promise(function (resolve, reject) {
      fs.unlink(p, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  Fs.prototype.stat = function stat(p) {
    var fs = System._nodeRequire('fs');
    return new Promise(function (resolve, reject) {
      fs.stat(p, function (err, fileStat) {
        if (err) {
          reject(err);
          return;
        }
        resolve(fileStat);
      });
    });
  };

  Fs.prototype.mkdir = function mkdir(p) {
    var fs = System._nodeRequire('fs');
    return new Promise(function (resolve, reject) {
      fs.mkdir(p, function (err, folder) {
        if (err) reject(err);
        resolve();
      });
    });
  };

  Fs.prototype.appendFile = function appendFile(p, text) {
    var fs = System._nodeRequire('fs');
    return new Promise(function (resolve, reject) {
      fs.appendFile(p, text, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  Fs.prototype.downloadFile = function downloadFile(url, targetPath) {
    var _this2 = this;

    var fs = System._nodeRequire('fs');
    return new Promise(function () {
      var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(resolve, reject) {
        var file;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                file = fs.createWriteStream(targetPath);
                _context12.prev = 1;
                _context12.next = 4;
                return _this2._downloadFile(file, url, targetPath);

              case 4:
                resolve();
                _context12.next = 10;
                break;

              case 7:
                _context12.prev = 7;
                _context12.t0 = _context12['catch'](1);

                reject(_context12.t0);

              case 10:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, _this2, [[1, 7]]);
      }));

      return function (_x13, _x14) {
        return _ref12.apply(this, arguments);
      };
    }());
  };

  Fs.prototype.getConstants = function getConstants() {
    var fs = System._nodeRequire('fs');
    return fs.constants;
  };

  Fs.prototype._downloadFile = function _downloadFile(stream, url, targetPath) {
    var _this3 = this;

    var nodeUrl = System._nodeRequire('url');
    var http = System._nodeRequire('http');
    var https = System._nodeRequire('https');

    var promise = new Promise(function (resolve, reject) {
      var opts = nodeUrl.parse(url);
      opts.headers = {
        'User-Agent': 'electron'
      };
      (url.startsWith('https') ? https : http).get(opts, function (response) {
        if (response.statusCode === 200) {
          response.on('data', function (data) {
            stream.write(data);
          }).on('end', function () {
            stream.end();
            resolve();
          });
        } else if (response.statusCode === 302 && response.headers.location) {
          _this3._downloadFile(stream, response.headers.location, targetPath).then(function () {
            return resolve();
          }).catch(function (e) {
            return reject(e);
          });
        } else {
          reject('ERROR: Status code ' + response.statusCode + ' is not 200 or 302 (redirect)');
        }
      });
    });

    return promise;
  };

  return Fs;
}();
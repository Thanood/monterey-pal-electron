'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NPM = System._nodeRequire('aurelia-cli/lib/npm').NPM;
var path = System._nodeRequire('path');

var AureliaCLI = exports.AureliaCLI = function () {
    function AureliaCLI() {
        _classCallCheck(this, AureliaCLI);
    }

    AureliaCLI.prototype.create = function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(model) {
            var ProjectTemplate, options, project, configurePlatform, configureTranspiler, configureMarkupProcessor, configureCSSProcessor, configureUnitTestRunner, configureEditor, pathToAddProject;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            ProjectTemplate = System._nodeRequire('aurelia-cli/lib/commands/new/project-template').ProjectTemplate;
                            options = {
                                hasFlag: function hasFlag() {
                                    return false;
                                }
                            };
                            project = new ProjectTemplate(model, options);
                            configurePlatform = System._nodeRequire('aurelia-cli/lib/commands/new/platforms/' + model.platform.id);

                            configurePlatform(project, options);

                            configureTranspiler = System._nodeRequire('aurelia-cli/lib/commands/new/transpilers/' + model.transpiler.id);

                            configureTranspiler(project, options);

                            configureMarkupProcessor = System._nodeRequire('aurelia-cli/lib/commands/new/markup-processors/' + model.markupProcessor.id);

                            configureMarkupProcessor(project, options);

                            configureCSSProcessor = System._nodeRequire('aurelia-cli/lib/commands/new/css-processors/' + model.cssProcessor.id);

                            configureCSSProcessor(project, options);

                            configureUnitTestRunner = System._nodeRequire('aurelia-cli/lib/commands/new/unit-test-runners/' + model.unitTestRunner.id);

                            configureUnitTestRunner(project, options);

                            configureEditor = System._nodeRequire('aurelia-cli/lib/commands/new/editors/' + model.editor.id);

                            configureEditor(project, options);

                            pathToAddProject = model.path;
                            _context.next = 18;
                            return project.create({}, pathToAddProject);

                        case 18:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function create(_x) {
            return _ref.apply(this, arguments);
        }

        return create;
    }();

    AureliaCLI.prototype.install = function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(model) {
            var npm, npmOptions;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            npm = new NPM();
                            npmOptions = {
                                loglevel: 'error',
                                color: 'always',
                                save: true,
                                'save-dev': true,
                                workingDirectory: path.join(model.path, model.name)
                            };
                            _context2.prev = 2;
                            _context2.next = 5;
                            return npm.install([], npmOptions);

                        case 5:
                            return _context2.abrupt('return', _context2.sent);

                        case 8:
                            _context2.prev = 8;
                            _context2.t0 = _context2['catch'](2);

                            console.log(_context2.t0);
                            throw _context2.t0;

                        case 12:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[2, 8]]);
        }));

        function install(_x2) {
            return _ref2.apply(this, arguments);
        }

        return install;
    }();

    return AureliaCLI;
}();
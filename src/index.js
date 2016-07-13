import {initializePAL} from 'monterey-pal';
import {AureliaCLI}    from './aurelia-cli';
import {Fs}            from './fs';
import {Session}       from './session';
import {Processes}     from './processes';
import {NPM}           from './npm';
import {JSPM}          from './jspm';
import {OS}            from './os';

export function initialize() {
  let _fs = new Fs();
  let _aureliaCLI = new AureliaCLI();
  let _session = new Session();
  let _processes = new Processes();
  let _npm = new NPM();
  let _jspm = new JSPM();
  let _os = new OS();

  initializePAL((fs, session, aureliaCLI, processes, npm, jspm, os) => {
    Object.assign(fs, _fs);
    Object.assign(fs, _fs.constructor.prototype);
    Object.assign(aureliaCLI, _aureliaCLI);
    Object.assign(aureliaCLI, _aureliaCLI.constructor.prototype);
    Object.assign(session, _session)
    Object.assign(session, _session.constructor.prototype);
    Object.assign(processes, _processes)
    Object.assign(processes, _processes.constructor.prototype);
    Object.assign(npm, _npm)
    Object.assign(npm, _npm.constructor.prototype);
    Object.assign(jspm, _jspm)
    Object.assign(jspm, _jspm.constructor.prototype);
    Object.assign(os, _os)
    Object.assign(os, _os.constructor.prototype);
  });
}

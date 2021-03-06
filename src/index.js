import {initializePAL} from 'monterey-pal';
import {AureliaCLI}    from './aurelia-cli';
import {Fs}            from './fs';
import {Session}       from './session';
import {NPM}           from './npm';
import {JSPM}          from './jspm';
import {OS}            from './os';
import {Electron}      from './electron';

export function initialize() {
  let _fs = new Fs();
  let _aureliaCLI = new AureliaCLI();
  let _session = new Session();
  let _npm = new NPM();
  let _jspm = new JSPM();
  let _os = new OS();
  let _electron = new Electron();

  initializePAL((fs, session, aureliaCLI, npm, jspm, os, electron) => {
    Object.assign(fs, _fs);
    Object.assign(fs, _fs.constructor.prototype);
    Object.assign(aureliaCLI, _aureliaCLI);
    Object.assign(aureliaCLI, _aureliaCLI.constructor.prototype);
    Object.assign(session, _session)
    Object.assign(session, _session.constructor.prototype);
    Object.assign(npm, _npm)
    Object.assign(npm, _npm.constructor.prototype);
    Object.assign(jspm, _jspm)
    Object.assign(jspm, _jspm.constructor.prototype);
    Object.assign(os, _os)
    Object.assign(os, _os.constructor.prototype);
    Object.assign(electron, _electron)
    Object.assign(electron, _electron.constructor.prototype);
  });
}

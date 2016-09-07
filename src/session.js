export class Session {

  get(key) {
    const storage = System._nodeRequire('electron-json-storage');
    return new Promise((resolve, reject) => {
      storage.get(key, function(error, data) {
        if (error) reject(error);

        resolve(data);
      });
    });
  }

  async set(key, value) {
    const storage = System._nodeRequire('electron-json-storage');
    return new Promise((resolve, reject) => {
      storage.set(key, value, function(error) {
        if (error) reject(error);

        resolve();
      });
    });
  }

  async clear() {
    const storage = System._nodeRequire('electron-json-storage');
    return new Promise(resolve => {
      storage.clear(function(error) {
        if (error) reject(error);

        resolve();
      });
    });
  }

  async has(key) {
    const storage = System._nodeRequire('electron-json-storage');
    return new Promise(resolve => {
      storage.has(key, function(error, hasKey) {
        if (error) resolve(error);

        resolve(hasKey);
      });
    });
  }

  getEnv() {
    const remote   = System._nodeRequire('electron').remote;
    return remote.getGlobal('environment');
  }
}

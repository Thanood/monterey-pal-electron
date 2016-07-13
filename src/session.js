const storage = System._nodeRequire('electron-json-storage');

export class Session {

  get(key) {
    return new Promise((resolve, reject) => {
      storage.get(key, function(error, data) {
        if (error) reject(error);

        resolve(data);
      });
    });
  }

  async set(key, value) {
    return new Promise((resolve, reject) => {
      storage.set(key, value, function(error) {
        if (error) reject(error);

        resolve();
      });
    });
  }

  async clear() {
    return new Promise(resolve => {
      storage.clear(function(error) {
        if (error) reject(error);

        resolve();
      });
    });
  }

  async has(key) {
    return new Promise(resolve => {
      storage.has(key, function(error, hasKey) {
        if (error) resolve(error);

        resolve(hasKey);
      });
    });
  }
}

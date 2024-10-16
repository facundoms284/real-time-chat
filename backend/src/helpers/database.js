const path = require('path');
const fs = require('fs');

class Database {
  constructor(name) {
    this._fileName = path.resolve(__dirname, `../db/${name}.json`);
  }

  async _readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this._fileName, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else resolve(JSON.parse(data));
      });
    });
  }

  async _writeFile(data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this._fileName, JSON.stringify(data), 'utf8', (err) => {
        if (err) {
          reject(err);
        } else resolve();
      });
    });
  }

  async getAll() {
    return this._readFile();
  }

  async add(newData) {
    const data = await this._readFile();
    data.push(newData);
    await this._writeFile(data);
    return newData;
  }

  async delete(id) {
    const data = await this._readFile();
    const newData = data.filter((item) => item.id !== id);
    await this._writeFile(newData);
  }
}

module.exports = Database;

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

class DataExportOptions {
  constructor(config) {
    this.config = config;
    this.exportPath = config.exportPath || './exports';
  }

  async exportData(data, fileName) {
    try {
      const filePath = path.join(this.exportPath, fileName);
      await writeFileAsync(filePath, JSON.stringify(data, null, 2));
      console.log(`Data exported successfully to ${filePath}`);
    } catch (error) {
      console.error('Failed to export data:', error);
      throw error;
    }
  }

  async importData(fileName) {
    try {
      const filePath = path.join(this.exportPath, fileName);
      const data = await readFileAsync(filePath, 'utf8');
      console.log(`Data imported successfully from ${filePath}`);
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to import data:', error);
      throw error;
    }
  }

  setExportPath(newPath) {
    this.exportPath = newPath;
    console.log(`Export path set to ${this.exportPath}`);
  }

  getExportPath() {
    return this.exportPath;
  }
}

module.exports = DataExportOptions;

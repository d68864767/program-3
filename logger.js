const fs = require('fs');
const path = require('path');
const { format } = require('util');

const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
};

class Logger {
  constructor(logFilePath) {
    this.logFilePath = logFilePath || path.join(__dirname, 'logs', 'app.log');
    this.logStream = fs.createWriteStream(this.logFilePath, { flags: 'a' });
  }

  log(level, message, ...additionalDetails) {
    const timestamp = new Date().toISOString();
    const logMessage = format(
      '[%s] [%s] %s %s\n',
      timestamp,
      level.toUpperCase(),
      message,
      additionalDetails.map(detail => JSON.stringify(detail)).join(' ')
    );

    this.logStream.write(logMessage);
  }

  debug(message, ...additionalDetails) {
    this.log(LOG_LEVELS.DEBUG, message, ...additionalDetails);
  }

  info(message, ...additionalDetails) {
    this.log(LOG_LEVELS.INFO, message, ...additionalDetails);
  }

  warn(message, ...additionalDetails) {
    this.log(LOG_LEVELS.WARN, message, ...additionalDetails);
  }

  error(message, ...additionalDetails) {
    this.log(LOG_LEVELS.ERROR, message, ...additionalDetails);
  }

  close() {
    if (this.logStream) {
      this.logStream.end();
    }
  }
}

// Ensure the logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

module.exports = Logger;

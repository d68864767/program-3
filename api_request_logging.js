const fs = require('fs');
const path = require('path');
const { logger } = require('./logger.js');

const logDirectory = path.join(__dirname, 'logs');
const requestLogPath = path.join(logDirectory, 'api_requests.log');

// Ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

/**
 * Log an API request to a file.
 * @param {Object} requestDetails - The details of the request to log.
 */
function logApiRequest(requestDetails) {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - ${requestDetails.method} ${requestDetails.endpoint} - Status: ${requestDetails.statusCode}\n`;

  // Append to the log file
  fs.appendFile(requestLogPath, logEntry, (err) => {
    if (err) {
      logger.error('Error writing to API request log file:', err);
    }
  });
}

/**
 * Middleware function for logging API requests.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
function apiRequestLoggerMiddleware(req, res, next) {
  res.on('finish', () => {
    logApiRequest({
      method: req.method,
      endpoint: req.originalUrl || req.url,
      statusCode: res.statusCode,
    });
  });

  next();
}

module.exports = {
  logApiRequest,
  apiRequestLoggerMiddleware,
};

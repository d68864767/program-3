const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const ACCESS_LOGS_FILE = path.join(__dirname, 'access_logs.txt');

/**
 * Writes an access log entry to the access logs file.
 * @param {string} apiKey - The API key used for the request.
 * @param {string} endpoint - The API endpoint that was accessed.
 * @param {Date} accessTime - The date and time when the access occurred.
 * @param {Object} additionalInfo - Additional information about the access.
 */
function logAccess(apiKey, endpoint, accessTime, additionalInfo = {}) {
    const logEntry = {
        apiKey,
        endpoint,
        accessTime: accessTime.toISOString(),
        ...additionalInfo
    };

    const logString = JSON.stringify(logEntry) + '\n';

    fs.appendFile(ACCESS_LOGS_FILE, logString, (err) => {
        if (err) {
            logger.error('Error writing to access logs file:', err);
        }
    });
}

/**
 * Reads the access logs file and returns all log entries.
 * @param {Function} callback - A callback function that receives the array of log entries.
 */
function readAccessLogs(callback) {
    fs.readFile(ACCESS_LOGS_FILE, (err, data) => {
        if (err) {
            logger.error('Error reading access logs file:', err);
            callback(err, null);
            return;
        }

        const logs = data.toString().trim().split('\n').map(line => {
            try {
                return JSON.parse(line);
            } catch (parseError) {
                logger.error('Error parsing log entry:', parseError);
                return null;
            }
        }).filter(entry => entry !== null);

        callback(null, logs);
    });
}

module.exports = {
    logAccess,
    readAccessLogs
};

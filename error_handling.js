/**
 * error_handling.js
 * This module provides error handling utilities for the OpenAI API key management system.
 * It defines a standardized error response structure and logging mechanism.
 */

const logger = require('./logger');

/**
 * Error types for categorization and easy identification of error sources.
 */
const ErrorTypes = {
  USAGE_MONITORING: 'UsageMonitoringError',
  ACCESS_MANAGEMENT: 'AccessManagementError',
  RATE_LIMIT: 'RateLimitError',
  SECURITY: 'SecurityError',
  BILLING: 'BillingError',
  INTEGRATION: 'IntegrationError',
  DOCUMENTATION: 'DocumentationError',
  VERSION_COMPATIBILITY: 'VersionCompatibilityError',
  SUPPORT: 'SupportError',
  // ... Add other error types as needed
};

/**
 * handleError - Centralized error handling function.
 * @param {Error} error - The error object thrown by the system.
 * @param {string} type - The type of error from the ErrorTypes enumeration.
 * @param {Object} req - The request object from the Express.js context.
 * @param {Object} res - The response object from the Express.js context.
 */
function handleError(error, type, req, res) {
  // Log the error details for debugging and auditing purposes
  logger.log({
    level: 'error',
    message: error.message,
    type: type,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  // Determine the appropriate status code based on error type
  let statusCode;
  switch (type) {
    case ErrorTypes.USAGE_MONITORING:
    case ErrorTypes.ACCESS_MANAGEMENT:
    case ErrorTypes.VERSION_COMPATIBILITY:
      statusCode = 400; // Bad Request
      break;
    case ErrorTypes.RATE_LIMIT:
      statusCode = 429; // Too Many Requests
      break;
    case ErrorTypes.SECURITY:
    case ErrorTypes.BILLING:
      statusCode = 403; // Forbidden
      break;
    default:
      statusCode = 500; // Internal Server Error
  }

  // Send a standardized error response
  res.status(statusCode).json({
    success: false,
    type: type,
    message: error.message,
    code: statusCode,
  });
}

module.exports = {
  handleError,
  ErrorTypes,
};

// error_handler.js
// This module provides error handling utilities for the OpenAI API key management system.

class ErrorHandler {
  constructor() {
    // Error logging can be enhanced by integrating with external logging services
  }

  // Handles API errors and logs them appropriately
  static handleApiError(error, req, res) {
    console.error(`API Error: ${error.message}`, {
      endpoint: req.originalUrl,
      method: req.method,
      status: error.status || 500,
    });

    // Respond with a generic error message to the client
    res.status(error.status || 500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    });
  }

  // Handles application-specific errors and logs them
  static handleAppError(error, req, res) {
    console.error(`Application Error: ${error.message}`, {
      endpoint: req.originalUrl,
      method: req.method,
      status: error.status || 500,
    });

    // Respond with the error message if it's safe to expose to the client
    res.status(error.status || 500).json({
      success: false,
      message: error.isPublic ? error.message : 'An error occurred within the application.',
    });
  }

  // Handles unexpected errors and logs them
  static handleUnexpectedError(error, req, res) {
    console.error(`Unexpected Error: ${error.stack}`, {
      endpoint: req.originalUrl,
      method: req.method,
    });

    // Respond with a generic error message to the client
    res.status(500).json({
      success: false,
      message: 'An unexpected internal error occurred. Please contact support.',
    });
  }

  // Logs security-related errors and alerts the appropriate team
  static handleSecurityError(error, req) {
    console.error(`Security Error: ${error.message}`, {
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
    });

    // Additional security error handling logic such as alerting the security team
    // can be implemented here.
  }
}

module.exports = ErrorHandler;

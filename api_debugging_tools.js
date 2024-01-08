// api_debugging_tools.js
// This module provides tools and utilities for debugging API interactions.

const logger = require('./logger.js');
const error_handler = require('./error_handler.js');

class APIDebuggingTools {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    // Log the request and response details for debugging purposes
    logRequestResponse(request, response) {
        logger.log(`Request: ${JSON.stringify(request, null, 2)}`);
        logger.log(`Response: ${JSON.stringify(response, null, 2)}`);
    }

    // Simulate API requests to test error handling and response accuracy
    simulateRequest(request) {
        try {
            const response = this.apiClient.sendRequest(request);
            this.logRequestResponse(request, response);
            return response;
        } catch (error) {
            error_handler.handleError(error);
            this.logRequestResponse(request, { error: error.message });
            throw error;
        }
    }

    // Enable verbose logging for the API client
    enableVerboseLogging() {
        this.apiClient.setVerbose(true);
        logger.log('Verbose logging enabled for API client.');
    }

    // Disable verbose logging for the API client
    disableVerboseLogging() {
        this.apiClient.setVerbose(false);
        logger.log('Verbose logging disabled for API client.');
    }
}

module.exports = APIDebuggingTools;

// init.js
// Initialization script for setting up the OpenAI API client and related configurations

const fs = require('fs');
const ApiClient = require('./api_client');
const ErrorHandler = require('./error_handler');
const Logger = require('./logger');
const configPath = './config.json';

// Load configuration settings
let config;
try {
  const configFile = fs.readFileSync(configPath);
  config = JSON.parse(configFile);
} catch (error) {
  ErrorHandler.handle(error);
  process.exit(1); // Exit if configuration cannot be loaded
}

// Initialize the API client with the loaded configuration
const apiClient = new ApiClient(config.openAIKey);

// Set up logging based on configuration
const logger = new Logger(config.loggingLevel);

// Perform initial health check to ensure API is reachable
apiClient.healthCheck()
  .then(() => logger.log('API health check passed'))
  .catch((error) => {
    logger.error('API health check failed', error);
    process.exit(1); // Exit if initial health check fails
  });

// Export initialized modules for use in other parts of the application
module.exports = {
  apiClient,
  logger,
  config
};

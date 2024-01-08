const axios = require('axios');
const config = require('./config.json');
const ErrorHandler = require('./error_handler');
const Logger = require('./logger');

class APIClient {
  constructor() {
    this.apiKey = config.OPENAI_API_KEY;
    this.baseURL = config.OPENAI_API_BASE_URL;
    this.logger = new Logger();
    this.errorHandler = new ErrorHandler();
  }

  async makeRequest(endpoint, method = 'GET', data = {}) {
    const url = `${this.baseURL}/${endpoint}`;
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      data,
      url,
    };

    try {
      const response = await axios(options);
      this.logger.log(`Request to ${url} completed successfully.`);
      return response.data;
    } catch (error) {
      this.errorHandler.handle(error);
      this.logger.log(`Error making request to ${url}: ${error.message}`);
      throw error;
    }
  }

  // Additional methods for specific API actions can be added here
  // For example, to train a custom model, call a specific endpoint with required data
  async trainCustomModel(trainingData) {
    return this.makeRequest('custom-models/train', 'POST', trainingData);
  }

  // Method to fetch usage statistics
  async getUsageStatistics() {
    return this.makeRequest('usage/statistics', 'GET');
  }

  // Method to manage API key renewal and expiration
  async renewAPIKey() {
    return this.makeRequest('api-keys/renew', 'POST');
  }

  // ... other methods based on the project description
}

module.exports = APIClient;

// api_customization.js
// This module provides functionality to customize the API behavior and responses

const config = require('./config.json');

class APICustomization {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  // Customize API response format
  setResponseFormat(format) {
    if (!['json', 'xml', 'yaml'].includes(format)) {
      throw new Error('Unsupported response format');
    }
    this.apiClient.setDefaultResponseType(format);
  }

  // Enable or disable specific API features
  toggleFeature(feature, isEnabled) {
    if (typeof config.features[feature] === 'undefined') {
      throw new Error('Feature does not exist');
    }
    config.features[feature] = isEnabled;
  }

  // Add custom headers to API requests
  addCustomHeaders(headers) {
    if (typeof headers !== 'object') {
      throw new Error('Headers must be an object');
    }
    this.apiClient.setCustomHeaders(headers);
  }

  // Define custom query parameters for API requests
  setCustomQueryParams(params) {
    if (typeof params !== 'object') {
      throw new Error('Query parameters must be an object');
    }
    this.apiClient.setCustomQueryParams(params);
  }

  // Set a custom base URL for the API endpoints
  setCustomBaseURL(baseURL) {
    if (typeof baseURL !== 'string') {
      throw new Error('Base URL must be a string');
    }
    this.apiClient.setBaseURL(baseURL);
  }

  // Apply custom transformations to API responses
  setResponseTransform(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Response transform must be a function');
    }
    this.apiClient.setResponseTransform(callback);
  }
}

module.exports = APICustomization;

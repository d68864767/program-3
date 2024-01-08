// legacy_support.js
// This module provides functions to ensure backward compatibility with older systems.

const { OpenAIClient } = require('./api_client.js');
const logger = require('./logger.js');

class LegacySupport {
  constructor(apiKey) {
    this.apiClient = new OpenAIClient(apiKey);
  }

  // Function to check and handle any legacy API endpoints
  handleLegacyEndpoints(endpoint) {
    // Map or convert legacy endpoints to current ones if necessary
    const currentEndpoint = this.convertToCurrentEndpoint(endpoint);
    return currentEndpoint;
  }

  // Function to convert legacy endpoint to current endpoint
  convertToCurrentEndpoint(legacyEndpoint) {
    // Implement conversion logic based on your API's legacy and current endpoints
    const endpointMapping = {
      '/legacy/path': '/current/path',
      // Add more mappings as needed
    };

    return endpointMapping[legacyEndpoint] || legacyEndpoint;
  }

  // Function to adapt legacy parameters to the current API's expectations
  adaptLegacyParameters(params) {
    // Adapt parameters to match the current API's requirements
    const adaptedParams = { ...params };
    // Example adaptation: if the legacy system uses 'username' instead of 'user_id'
    if (adaptedParams.username) {
      adaptedParams.user_id = adaptedParams.username;
      delete adaptedParams.username;
    }
    // Add more adaptations as needed

    return adaptedParams;
  }

  // Function to provide a wrapper for making API calls with legacy support
  makeLegacyApiCall(endpoint, params) {
    try {
      const currentEndpoint = this.handleLegacyEndpoints(endpoint);
      const adaptedParams = this.adaptLegacyParameters(params);
      return this.apiClient.callApi(currentEndpoint, adaptedParams);
    } catch (error) {
      logger.error('Error making legacy API call:', error);
      throw error;
    }
  }
}

module.exports = LegacySupport;

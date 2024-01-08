// beta_features_access.js
// This module handles access to beta features using the OpenAI API key

const { OpenAI } = require('./api_client');
const logger = require('./logger');

class BetaFeaturesAccess {
  constructor(apiKey) {
    this.openAI = new OpenAI(apiKey);
    this.betaFeatures = [];
  }

  // Fetch the list of available beta features
  async fetchBetaFeatures() {
    try {
      const response = await this.openAI.getBetaFeatures();
      this.betaFeatures = response.data.features;
      logger.log('Fetched beta features successfully.');
    } catch (error) {
      logger.error('Error fetching beta features:', error);
      throw error;
    }
  }

  // Check if a specific feature is available in beta
  isFeatureAvailableInBeta(featureName) {
    return this.betaFeatures.includes(featureName);
  }

  // Request access to a beta feature
  async requestBetaFeatureAccess(featureName) {
    if (!this.isFeatureAvailableInBeta(featureName)) {
      logger.error(`Feature ${featureName} is not available in beta.`);
      return false;
    }

    try {
      await this.openAI.requestAccessToBetaFeature(featureName);
      logger.log(`Requested access to beta feature: ${featureName}`);
      return true;
    } catch (error) {
      logger.error(`Error requesting access to beta feature ${featureName}:`, error);
      throw error;
    }
  }

  // Get the current list of beta features the API key has access to
  getAccessedBetaFeatures() {
    return this.betaFeatures;
  }
}

module.exports = BetaFeaturesAccess;

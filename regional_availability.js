// regional_availability.js
// This module handles the regional availability of the OpenAI API services.

const config = require('./config.json');
const logger = require('./logger.js');
const error_handler = require('./error_handler.js');

class RegionalAvailability {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.availableRegions = config.availableRegions || [];
    }

    // Check if the API is available in the specified region
    isAvailableInRegion(region) {
        return this.availableRegions.includes(region);
    }

    // Fetch the latest list of available regions from the OpenAI API
    async updateAvailableRegions() {
        try {
            const response = await this.apiClient.getAvailableRegions();
            if (response && response.regions) {
                this.availableRegions = response.regions;
                logger.log('Updated available regions for OpenAI API services.');
            }
        } catch (error) {
            error_handler.handleError(error);
            logger.error('Failed to update available regions for OpenAI API services.');
        }
    }

    // Get the list of currently available regions
    getAvailableRegions() {
        return this.availableRegions;
    }
}

module.exports = RegionalAvailability;

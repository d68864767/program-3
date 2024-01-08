const config = require('./config.json');
const logger = require('./logger.js');
const api_client = require('./api_client.js');

class ResourceAllocation {
    constructor() {
        this.apiClient = new api_client(config.openAIKey);
    }

    async allocateResources(requestedResources) {
        try {
            // Check if the requested resources are within the allowed limits
            if (!this.validateResourceRequest(requestedResources)) {
                throw new Error('Requested resources exceed allowed limits.');
            }

            // Allocate resources by sending a request to the OpenAI API
            const allocationResponse = await this.apiClient.allocateResources(requestedResources);

            // Log the successful resource allocation
            logger.log(`Resources allocated: ${JSON.stringify(allocationResponse)}`);

            return allocationResponse;
        } catch (error) {
            // Handle errors in resource allocation
            logger.error(`Error in resource allocation: ${error.message}`);
            throw error;
        }
    }

    validateResourceRequest(requestedResources) {
        // Implement validation logic based on the application's requirements
        // For example, check against predefined resource limits in the config
        const resourceLimits = config.resourceLimits;
        return Object.keys(requestedResources).every(resource => {
            return requestedResources[resource] <= resourceLimits[resource];
        });
    }

    async releaseResources(resourceId) {
        try {
            // Release resources by sending a request to the OpenAI API
            const releaseResponse = await this.apiClient.releaseResources(resourceId);

            // Log the successful resource release
            logger.log(`Resources released: ${resourceId}`);

            return releaseResponse;
        } catch (error) {
            // Handle errors in resource release
            logger.error(`Error in resource release: ${error.message}`);
            throw error;
        }
    }
}

module.exports = ResourceAllocation;

const { OpenAIApiClient } = require('./api_client');
const { ErrorHandler } = require('./error_handler');
const { Logger } = require('./logger');

class IntegrationApplications {
    constructor() {
        this.apiClient = new OpenAIApiClient();
        this.errorHandler = new ErrorHandler();
        this.logger = new Logger();
    }

    /**
     * Integrates the OpenAI API with an external application.
     * @param {Object} appConfig - The configuration object for the application.
     * @returns {Promise<Object>} - The result of the integration process.
     */
    async integrateWithApplication(appConfig) {
        try {
            this.logger.log('Starting integration with application.');
            // Validate the appConfig object
            if (!appConfig || typeof appConfig !== 'object') {
                throw new Error('Invalid application configuration provided.');
            }

            // Perform the integration logic here
            // This could involve setting up webhooks, creating API keys for the app, etc.
            const integrationResult = await this.apiClient.setupIntegration(appConfig);

            this.logger.log('Integration with application successful.');
            return integrationResult;
        } catch (error) {
            this.errorHandler.handleError(error);
            this.logger.log('Integration with application failed.');
            throw error;
        }
    }

    /**
     * Removes the integration between the OpenAI API and an external application.
     * @param {string} appId - The ID of the application to remove integration from.
     * @returns {Promise<boolean>} - The result of the removal process.
     */
    async removeIntegration(appId) {
        try {
            this.logger.log(`Starting removal of integration for application ID: ${appId}`);
            // Validate the appId
            if (!appId || typeof appId !== 'string') {
                throw new Error('Invalid application ID provided.');
            }

            // Perform the removal logic here
            // This could involve revoking API keys, removing webhooks, etc.
            const removalResult = await this.apiClient.removeIntegration(appId);

            this.logger.log('Removal of application integration successful.');
            return removalResult;
        } catch (error) {
            this.errorHandler.handleError(error);
            this.logger.log('Removal of application integration failed.');
            throw error;
        }
    }
}

module.exports = { IntegrationApplications };

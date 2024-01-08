// renewal_expiration.js
// Handles the renewal and expiration of OpenAI API keys

const config = require('./config.json');
const logger = require('./logger.js');

class RenewalExpirationManager {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    // Checks the expiration date of the API key and renews it if necessary
    async checkAndRenewAPIKey() {
        try {
            const apiKeyInfo = await this.apiClient.getAPIKeyInfo();
            const expirationDate = new Date(apiKeyInfo.expirationDate);
            const currentDate = new Date();

            if (currentDate >= expirationDate) {
                const renewedKeyInfo = await this.renewAPIKey();
                logger.log(`API key renewed. New expiration date: ${renewedKeyInfo.expirationDate}`);
            } else {
                logger.log(`API key is valid until: ${apiKeyInfo.expirationDate}`);
            }
        } catch (error) {
            logger.error('Failed to check or renew API key:', error);
            throw error;
        }
    }

    // Renews the API key
    async renewAPIKey() {
        try {
            const response = await this.apiClient.renewAPIKey();
            if (response.success) {
                logger.log('API key successfully renewed.');
                return response.data;
            } else {
                logger.error('Failed to renew API key:', response.error);
                throw new Error(response.error);
            }
        } catch (error) {
            logger.error('Error renewing API key:', error);
            throw error;
        }
    }
}

module.exports = RenewalExpirationManager;

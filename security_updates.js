const { OpenAI_API_Client } = require('./api_client');
const { Logger } = require('./logger');
const { ErrorHandler } = require('./error_handler');

class SecurityUpdates {
    constructor() {
        this.apiClient = new OpenAI_API_Client();
        this.logger = new Logger();
        this.errorHandler = new ErrorHandler();
    }

    async checkForUpdates() {
        try {
            const updates = await this.apiClient.getSecurityUpdates();
            if (updates && updates.length > 0) {
                this.applyUpdates(updates);
            } else {
                this.logger.log('No security updates available at the moment.');
            }
        } catch (error) {
            this.errorHandler.handleError(error);
        }
    }

    async applyUpdates(updates) {
        try {
            for (const update of updates) {
                const result = await this.apiClient.applySecurityUpdate(update);
                if (result.success) {
                    this.logger.log(`Successfully applied security update: ${update.id}`);
                } else {
                    this.logger.log(`Failed to apply security update: ${update.id}`);
                }
            }
        } catch (error) {
            this.errorHandler.handleError(error);
        }
    }

    async scheduleRegularUpdateChecks(intervalInHours) {
        setInterval(async () => {
            await this.checkForUpdates();
        }, intervalInHours * 60 * 60 * 1000);
        this.logger.log(`Scheduled regular security updates check every ${intervalInHours} hours.`);
    }
}

module.exports = { SecurityUpdates };

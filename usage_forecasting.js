const config = require('./config.json');
const logger = require('./logger.js');
const api_client = require('./api_client.js');

class UsageForecasting {
    constructor() {
        this.usageData = [];
        this.forecastedUsage = {};
    }

    async fetchUsageData() {
        try {
            const response = await api_client.getUsageStatistics();
            if (response && response.data) {
                this.usageData = response.data;
                logger.log('Usage data fetched successfully.');
            }
        } catch (error) {
            logger.error('Error fetching usage data:', error);
            throw error;
        }
    }

    calculateForecast() {
        if (!this.usageData.length) {
            logger.error('No usage data available to forecast.');
            return;
        }

        // Simple moving average forecast for demonstration purposes
        let totalUsage = this.usageData.reduce((acc, data) => acc + data.usage, 0);
        let averageUsage = totalUsage / this.usageData.length;
        let forecastedNextPeriodUsage = averageUsage * config.forecastMultiplier;

        this.forecastedUsage = {
            averageUsage,
            forecastedNextPeriodUsage
        };

        logger.log('Usage forecast calculated successfully.');
    }

    async saveForecastData() {
        try {
            await api_client.saveForecastData(this.forecastedUsage);
            logger.log('Forecast data saved successfully.');
        } catch (error) {
            logger.error('Error saving forecast data:', error);
            throw error;
        }
    }

    async performUsageForecasting() {
        try {
            await this.fetchUsageData();
            this.calculateForecast();
            await this.saveForecastData();
        } catch (error) {
            logger.error('Usage forecasting failed:', error);
        }
    }
}

module.exports = new UsageForecasting();

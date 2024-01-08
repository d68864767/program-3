const config = require('./config.json');
const logger = require('./logger.js');

class AutomatedAlerts {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.alertThresholds = config.alertThresholds || {
      usageLimit: 80, // percentage
      rateLimit: 90, // percentage
      errorRate: 5 // percentage
    };
  }

  async checkUsage() {
    try {
      const usage = await this.apiClient.getUsageStatistics();
      if (usage.percentage >= this.alertThresholds.usageLimit) {
        this.triggerAlert(`Usage limit approaching: ${usage.percentage}% used`);
      }
    } catch (error) {
      logger.error('Failed to check API usage', error);
    }
  }

  async checkRateLimit() {
    try {
      const rateLimit = await this.apiClient.getRateLimitStatus();
      if (rateLimit.percentage >= this.alertThresholds.rateLimit) {
        this.triggerAlert(`Rate limit approaching: ${rateLimit.percentage}% used`);
      }
    } catch (error) {
      logger.error('Failed to check rate limit status', error);
    }
  }

  async checkErrorRate() {
    try {
      const errorRate = await this.apiClient.getErrorRate();
      if (errorRate.percentage >= this.alertThresholds.errorRate) {
        this.triggerAlert(`High error rate detected: ${errorRate.percentage}%`);
      }
    } catch (error) {
      logger.error('Failed to check error rate', error);
    }
  }

  triggerAlert(message) {
    // Implement the logic to send alerts (e.g., email, SMS, webhook)
    logger.alert(message);
    console.log(`ALERT: ${message}`);
    // Additional alert mechanisms can be implemented here
  }

  // Schedule periodic checks
  scheduleChecks() {
    setInterval(() => this.checkUsage(), config.checkIntervals.usage);
    setInterval(() => this.checkRateLimit(), config.checkIntervals.rateLimit);
    setInterval(() => this.checkErrorRate(), config.checkIntervals.errorRate);
  }
}

module.exports = AutomatedAlerts;
